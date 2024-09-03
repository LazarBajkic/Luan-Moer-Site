package com.bajkic.LuanMoerFashion.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.bajkic.LuanMoerFashion.Model.Product;

@org.springframework.stereotype.Controller
public class Controller {
	
	List<Product> productsList = Collections.synchronizedList(new ArrayList<>());
	List<Product> favoritesList = Collections.synchronizedList(new ArrayList<>());
	
	@GetMapping("/Collection")
	public String getCollection() {
		return "CollectionPage";
	}
	
	@GetMapping("/CollectionSelection")
	public String getCollectionSelect() {
		return "CollectionSelectionPage";
	}
	
	@GetMapping("/ProductInfo")
	public String getProduct() {
		return "ProductPage";
	}
	
	@GetMapping("/ContactPage")
	public String getContactPage() {
		return "ContactPage";
	}
	
	@GetMapping("/ContactPageBlock")
	public ModelAndView getContactPageBlock
	(@RequestParam("buttonIdShow") String show,
	 @RequestParam("visibleBlock") String visibleBlock,
	 @RequestParam("hideButton") String hideButton,
	 @RequestParam("blockIdHide") String hideBlock)
	{
		ModelAndView mav = new ModelAndView("ContactPage");
		mav.addObject("visibleBlock",visibleBlock);
		return mav;
	}
	
	@GetMapping("/FavoritesPage")
	public ModelAndView getFavoritesPage() {
		ModelAndView mav = new ModelAndView("FavoritesPage");
		mav.addObject("favoritesList",favoritesList);
		return mav;
	}
	
	@GetMapping("/CartPage")
	public ModelAndView getCartPage() {
		ModelAndView mav = new ModelAndView("CartPage");
		mav.addObject("productsList",productsList);
		return mav;
	}
	
	@PostMapping("/RemoveFromCart")
	public ModelAndView removeFromCart(@RequestParam("productName") String productName,@RequestParam("productColor") String productColor,
			@RequestParam("productSize")String productSize) {
		
		ModelAndView mav = new ModelAndView("CartPage");
		synchronized(productsList) {
			 for (Iterator<Product> iterator = productsList.iterator(); iterator.hasNext();) {
			        Product p = iterator.next();
			        if (p.getProductName().equals(productName) &&
			            p.getProductColor().equals(productColor) &&
			            p.getProductSize().equals(productSize)) {
			            iterator.remove();
			            break;
			        }
			    }
			
		}

		 	mav.addObject("productsList", productsList);
			return mav;
	}
	
	@GetMapping("/Checkout")
	public String getCheckoutPage() {
		return "PayInfoPage";
	}
	
	@PostMapping("/AddToCart")
	public String addToCart(@RequestParam("imageUrl")String imageUrl,
							@RequestParam("productName") String productName,
							@RequestParam("productColor") String productColor,
							@RequestParam("productSize")String productSize,
							@RequestParam("productPrice") int productPrice) {
		
		if(productColor.equals("")||productSize.equals("")) {
			System.out.println("error");
		}else {
			
			Product p = new Product(imageUrl,productName,productColor,productSize,productPrice);
			System.out.println(p.toString());
			productsList.add(p);
		}
		return "ProductPage";
	}
	
	@PostMapping("/AddToFavorites")
	public String addToFavorites(@RequestParam("imageUrl")String imageUrl,
								@RequestParam("productName") String productName,
								@RequestParam("productColor") String productColor,
								@RequestParam("productSize")String productSize,
								@RequestParam("productPrice") int productPrice) {
		if(productColor.equals("")||productSize.equals("")) {
			System.out.println("error");
		}else {
			Product p = new Product(imageUrl,productName,productColor,productSize,productPrice);
			System.out.println(p.toString());
			favoritesList.add(p);
		}
		
		return "ProductPage";
	}
	
}
