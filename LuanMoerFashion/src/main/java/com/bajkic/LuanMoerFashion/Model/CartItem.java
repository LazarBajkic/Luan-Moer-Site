package com.bajkic.LuanMoerFashion.Model;

public class CartItem {
	
	private String productName;
	private String productSize;
	private String productColor;
	private int quantity;
	private int price;
	
	public CartItem(String productName, String productSize, String productColor, int quantity, int price) {
		super();
		this.productName = productName;
		this.productSize = productSize;
		this.productColor = productColor;
		this.quantity = quantity;
		this.price = price;
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
		return "CartItem [productName=" + productName + ", productSize=" + productSize + ", productColor="
				+ productColor + ", quantity=" + quantity + ", price=" + price + "]";
	}
	
	
	
}
