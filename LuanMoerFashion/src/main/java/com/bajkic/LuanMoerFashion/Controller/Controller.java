package com.bajkic.LuanMoerFashion.Controller;

import java.io.IOException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.bajkic.LuanMoerFashion.APIController.EmailController;
import com.bajkic.LuanMoerFashion.Model.CartItem;
import com.bajkic.LuanMoerFashion.Model.Product;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;



@org.springframework.stereotype.Controller
@SessionAttributes({"favoritesList","totalPrice"})

public class Controller {
	
	List<Product> productsList = Collections.synchronizedList(new ArrayList<>());
	List<Product> favoritesList;
	
	@Autowired
	private EmailController eCon;
	
	  @ModelAttribute("favoritesList")
	    public List<Product> initializeFavorites() {
	        return new ArrayList<>();  
	    }
	  	
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
	
	
	@PostMapping("/submitCartItems")
	@ResponseBody
	public void handleCartItems(@RequestBody List<CartItem> cartItems,HttpSession session) {
		
		session.setAttribute("cartItems",cartItems);
		
	    for (CartItem item : cartItems) {
	        System.out.println("Product Name: " + item.getProductName());
	        System.out.println("Product Color: " + item.getProductColor());
	        System.out.println("Product Size: " + item.getProductSize());
	        System.out.println("Product Price: " + item.getPrice());
	        System.out.println("Quantity: " + item.getQuantity());
	    }
	    
	    int totalPrice = cartItems.stream()
	            .mapToInt(item -> item.getPrice() * item.getQuantity())
	            .sum();
	    
	}
	
	@PostMapping("/SendMessage")
	public String sendMessage(@RequestParam("senderEmail") String senderEmail,@RequestParam("message")String message) throws IOException {
		eCon.sendQuestion(senderEmail, message);
		System.out.println("success");
		return "ContactPage";
	}
	
   

    @GetMapping("/Checkout")
    public String showPayInfoPage(HttpSession session) {
    	System.out.println(session.getAttribute("cartItems").toString());
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
		  if (favoritesList == null) {
	            favoritesList = new ArrayList<>();
	        }
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
