package com.bajkic.LuanMoerFashion.Model;

public class Product {
	
	private String imageUrl;
	private String productName;
	private String productColor;
	private String productSize;
	private int quantity;
	private int productPrice;
	
	public Product() {
		
	}
	
	public Product(String imageUrl,String productName,String productColor,String productSize,int quantity,int productPrice) {
		this.imageUrl=imageUrl;
		this.productName=productName;
		this.productColor=productColor;
		this.productSize=productSize;
		this.quantity=quantity;
		this.productPrice=productPrice;
	}
	
	public Product(String imageUrl,String productName,String productColor,String productSize,int productPrice) {
		this.imageUrl=imageUrl;
		this.productName=productName;
		this.productColor=productColor;
		this.productSize=productSize;
		this.productPrice=productPrice;
	}
	
	public String getImageUrl() {
		return imageUrl;
	}
	
	public void setImageUrl(String imageUrl) {
		this.imageUrl=imageUrl;
	}
	
	public String getProductName() {
		return productName;
	}
	
	public void setProductName(String productName) {
		this.productName=productName;
	}
	
	public String getProductColor() {
		return productColor;
	}
	
	public void setProductColor(String productColor) {
		this.productColor=productColor;
	}
	
	public String getProductSize() {
		return productSize;
	}
	
	public void setProductSize(String productSize) {
		this.productSize=productSize;
	}
	
	public int getProductPrice() {
		return productPrice;
	}
	
	public void setProductPrice(int productPrice) {
		this.productPrice=productPrice;
	}

	@Override
	public String toString() {
		return "Product [imageUrl=" + imageUrl + ", productName=" + productName + ", productColor=" + productColor
				+ ", productSize=" + productSize + ", quantity=" + quantity + ", productPrice=" + productPrice + "]";
	}

	
	
}
