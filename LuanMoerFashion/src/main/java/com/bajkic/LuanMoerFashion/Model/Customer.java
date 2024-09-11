package com.bajkic.LuanMoerFashion.Model;

public class Customer {
	
	 private String email;
	    private String firstName;
	    private String lastName;
	    private String address;
	    private String apartment;
	    private String postalCode;
	    private String city;
	    private String phoneNum;
	    private String country;
		
	    public Customer(String email, String firstName, String lastName, String address, String apartment,
				String postalCode, String city, String phoneNum, String country) {
			super();
			this.email = email;
			this.firstName = firstName;
			this.lastName = lastName;
			this.address = address;
			this.apartment = apartment;
			this.postalCode = postalCode;
			this.city = city;
			this.phoneNum = phoneNum;
			this.country = country;
		}
	    
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getFirstName() {
			return firstName;
		}
		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}
		public String getLastName() {
			return lastName;
		}
		public void setLastName(String lastName) {
			this.lastName = lastName;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public String getApartment() {
			return apartment;
		}
		public void setApartment(String apartment) {
			this.apartment = apartment;
		}
		public String getPostalCode() {
			return postalCode;
		}
		public void setPostalCode(String postalCode) {
			this.postalCode = postalCode;
		}
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public String getPhoneNum() {
			return phoneNum;
		}
		public void setPhoneNum(String phoneNum) {
			this.phoneNum = phoneNum;
		}
		public String getCountry() {
			return country;
		}
		public void setCountry(String country) {
			this.country = country;
		}

		@Override
		public String toString() {
			return "Email=" + email + "\n First name=" + firstName + "\n Last name=" + lastName + "\n Address="
					+ address + "\n Apartment=" + apartment + "\n Postal code=" + postalCode + "\n City=" + city
					+ "\n Phone number=" + phoneNum + "\n Country=" + country;
		}
	
		
}
