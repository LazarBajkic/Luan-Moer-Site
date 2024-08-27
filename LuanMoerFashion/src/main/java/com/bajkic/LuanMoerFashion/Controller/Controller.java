package com.bajkic.LuanMoerFashion.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@org.springframework.stereotype.Controller
public class Controller {
	
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
	public String getFavoritesPage() {
		return "FavoritesPage";
	}
	
	@GetMapping("/CartPage")
	public String getCartPage() {
		return "CartPage";
	}
	
	@GetMapping("/Checkout")
	public String getCheckoutPage() {
		return "PayInfoPage";
	}
	
}
