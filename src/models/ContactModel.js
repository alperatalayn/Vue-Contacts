import Adress from "./AdressModel";

export default class Contact {
  constructor(id ="", first_name = "", last_name = "", phone = "", adresses = [Adress], job ="") {
    this.id = id; 
    this.first_name=first_name;
    this.last_name=last_name;
    this.phone=phone;
    this.adresses=adresses;
    this.job=job;
  }
}