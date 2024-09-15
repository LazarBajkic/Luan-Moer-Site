package com.bajkic.LuanMoerFashion.Model;

public class CartItem {
	
	private String imageUrl;
	private String productName;
	private String productSize;
	private String productColor;
	private int quantity;
	private int price;
	
	public CartItem() {
		
	}
	
	public CartItem(String imageUrl,String productName, String productSize, String productColor, int quantity, int price) {
		super();
		this.imageUrl=imageUrl;
		this.productName = productName;
		this.productSize = productSize;
		this.productColor = productColor;
		this.quantity = quantity;
		this.price = price;
	}
	
	
	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductSize() {
		return productSize;
	}
	public void setProductSize(String productSize) {
		this.productSize = productSize;
	}
	public String getProductColor() {
		return productColor;
	}
	public void setProductColor(String productColor) {
		this.productColor = productColor;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "\n Product image="+ imageUrl +" \nProduct name=" + productName + "\n Product size=" + productSize + "\n Product color="
				+ productColor + "\n Quantity=" + quantity + "\n Price=" + price;
	}
	
	
	
}
