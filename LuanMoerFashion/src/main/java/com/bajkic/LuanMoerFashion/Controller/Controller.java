package com.bajkic.LuanMoerFashion.Controller;

import java.io.IOException;


import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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
import com.bajkic.LuanMoerFashion.Model.Customer;
import com.bajkic.LuanMoerFashion.Model.Product;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;




@org.springframework.stereotype.Controller
@SessionAttributes({"favoritesList","totalPrice"})

public class Controller {
	
	List<Product> productsList = Collections.synchronizedList(new ArrayList<>());
	List<Product> favoritesList;
	
	@Autowired
	private EmailController eCon;
	
	  
	  @ModelAttribute("cartItems")
	    public List<CartItem> initializeCart(HttpSession session) {
	        List<CartItem> cartItems = (List<CartItem>) session.getAttribute("cartItems");
	        if (cartItems == null) {
	            cartItems = new ArrayList<>();
	            session.setAttribute("cartItems", cartItems);
	        }
	        return cartItems;
	    }
	  
	@GetMapping("/Collection")
	public ModelAndView getCollection(@RequestParam("gender") String gender) {
		ModelAndView mav = new ModelAndView("CollectionPage");
		mav.addObject("gender", gender);
		return mav;
	}
	
	@GetMapping("/CollectionSelection")
	public String getCollectionSelect() {
		return "CollectionSelectionPage";
	}
	
	@GetMapping("/ProductInfo")
	public ModelAndView getProduct(@RequestParam("name") String name,HttpSession session) {
		ModelAndView mav = new ModelAndView("ProductPage");
		session.setAttribute("name", name);
		mav.addObject("name", name);
		return mav;
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
	public ModelAndView getFavoritesPage(HttpSession session) {
		ModelAndView mav = new ModelAndView("FavoritesPage");
		favoritesList = (List<Product>) session.getAttribute("favoritesList");
		mav.addObject("favoritesList",favoritesList);
		return mav;
	}
	
	@GetMapping("/CartPage")
	public ModelAndView getCartPage(HttpSession session,HttpServletResponse response) {
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.setHeader("Pragma", "no-cache");
    	response.setDateHeader("Expires", 0);
		ModelAndView mav = new ModelAndView("CartPage");
		mav.addObject("cartItems",session.getAttribute("cartItems"));
		return mav;
	}
	
	@PostMapping("/RemoveFromCart")
	public ModelAndView removeFromCart(@RequestParam("productName") String productName,@RequestParam("productColor") String productColor,
			@RequestParam("productSize")String productSize,HttpSession session) {
		
		List<CartItem> list = (List<CartItem>) session.getAttribute("cartItems");
		
		ModelAndView mav = new ModelAndView("CartPage");
		synchronized(productsList) {
			 for (Iterator<CartItem> iterator = list.iterator(); iterator.hasNext();) {
			        CartItem p = iterator.next();
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
		
		  int totalPrice = cartItems.stream()
		            .mapToInt(item -> item.getPrice() * item.getQuantity())
		            .sum();
		
	    for (CartItem item : cartItems) {
	    	System.out.println("Product image: " + item.getImageUrl());
	        System.out.println("Product Name: " + item.getProductName());
	        System.out.println("Product Color: " + item.getProductColor());
	        System.out.println("Product Size: " + item.getProductSize());
	        System.out.println("Product Price: " + totalPrice);
	        System.out.println("Quantity: " + item.getQuantity());
	    }
	    
	  
	    
	    session.setAttribute("totalPrice", totalPrice);
	    
	}
	
	@PostMapping("/SendMessage")
	public String sendMessage(@RequestParam("firstName")String firstName,@RequestParam("lastName")String lastName,@RequestParam("senderEmail") String email,@RequestParam("message")String message) throws IOException {
		StringBuilder sb = new StringBuilder();
		sb.append(email);
		sb.append("\n");
		sb.append(firstName);
		sb.append("\n");
		sb.append(lastName);
		sb.append("\n");
		sb.append(message);
		eCon.sendInfo("Pitanje",sb.toString());
		System.out.println("success");
		System.out.println("Message received from: " + firstName + " " + lastName);

		return "ContactPage";
	}
	
	
	@PostMapping("/submitUserInfo")
	@ResponseBody
	public void handleUserInfo(@RequestBody Customer customerInfo,HttpSession session) {
		session.setAttribute("customerInfo", customerInfo);
		System.out.println(session.getAttribute("totalPrice"));
		System.out.println(session.getAttribute("customerInfo").toString());
	}
	
  
    @GetMapping("/Checkout")
    public String showPayInfoPage(HttpSession session,HttpServletResponse response) {
    	response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    	response.setHeader("Pragma", "no-cache");
    	response.setDateHeader("Expires", 0);
    	List<CartItem> cartContent = (List<CartItem>) session.getAttribute("cartItems");
    	if(cartContent == null || cartContent.isEmpty()) {
    		return "CartPage";
    	}
    	System.out.println(session.getAttribute("cartItems").toString());
        return "PayInfoPage";
    }
	 
	@PostMapping("/AddToCart")
	public ModelAndView addToCart(@RequestParam("imageUrl")String imageUrl,
							@RequestParam("productName") String productName,
							@RequestParam("productColor") String productColor,
							@RequestParam("productSize")String productSize,
							@RequestParam("productPrice") int productPrice, @ModelAttribute("cartItems") List<CartItem> cartItems,HttpSession session) {
		ModelAndView mav = new ModelAndView("ProductPage");
		String name = (String) session.getAttribute("name");
		mav.addObject("name", name);
		if(productColor.equals("")||productSize.equals("")) {
			System.out.println("error");
		}else {
			
			
			CartItem p = new CartItem(imageUrl,productName,productColor,productSize,1,productPrice);
			System.out.println(p.toString());
			cartItems.add(p);
			
		}
		
		return mav;
	}
	
	@PostMapping("/sendOrder")
	@ResponseBody
	public void sendOrder(HttpSession session) throws IOException {
		Customer customer = (Customer) session.getAttribute("customerInfo");
		List<CartItem> cartItemsSend = (List<CartItem>) session.getAttribute("cartItems");
		StringBuilder sb = new StringBuilder();
		
		sb.append(customer.toString());
		for (CartItem item : cartItemsSend) {
		    sb.append(item.toString()); 
		}
		
		String orderBody = sb.toString();
		
		eCon.sendInfo("Porudzbina",orderBody);
		System.out.println("Zvali me");
	}
	
	
	@PostMapping("/AddToFavorites")
	public ModelAndView addToFavorites(@RequestParam("imageUrl") String imageUrl,
	                              @RequestParam("productName") String productName,
	                              @RequestParam("productColor") String productColor,
	                              @RequestParam("productSize") String productSize,
	                              @RequestParam("productPrice") int productPrice,
	                              HttpSession session) {

	    List<Product> favoritesList = (List<Product>) session.getAttribute("favoritesList");
	    
	    if(favoritesList == null) {
	    	favoritesList = Collections.synchronizedList(new ArrayList<>());
	    }
	    
	    ModelAndView mav = new ModelAndView("ProductPage");
	    String name = (String) session.getAttribute("name");
	    mav.addObject("name", name);
	    
	    if (productColor.isEmpty() || productSize.isEmpty()) {
	        System.out.println("error");
	    } else {
	        Product p = new Product(imageUrl, productName, productColor, productSize, productPrice);
	        favoritesList.add(p);
	        session.setAttribute("favoritesList", favoritesList);
	    }

	    return mav;
	}
	
	@GetMapping("/getFavoritesList")
	@ResponseBody
	public List<Product> getFavoritesList(HttpSession session) {
	    List<Product> favoritesList = (List<Product>) session.getAttribute("favoritesList");
	    if (favoritesList == null) {
	        favoritesList = new ArrayList<>();
	    }
	    return favoritesList;
	}
}
