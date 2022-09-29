const readline = require("readline-sync");
class Contact{

    constructor(...params){
        this.firstName = params[0];
        this.lastName = params[1];
        this.address = params[2];
        this.city = params[3];
        this.state = params[4];
        this.zip = params[5];
        this.phoneno = params[6];
        this.email = params[7];
    }

    set firstName(firstName) {
        let pattern = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if(pattern.test(firstName)) {
            this._firstName = firstName;
        } else {
            throw "First Name is incorrect.";
        }
    }
    get firstName() {
        return this._firstName;
    }

    set lastName(lastName) {
        let pattern = RegExp('^[A-Z]{1}[A-Za-z]{2,}$');
        if(pattern.test(lastName)) {
            this._lastName = lastName
        } else {
            throw "Last Name is incorrect.";
        }
    }
    get lastName() {
        return this._lastName;
    }

    set address(address) {
        let pattern = RegExp('^[A-Za-z]{4,}$');
        if(pattern.test(address)) {
          this._address = address;  
        } else throw "Address Must have 4 Characters";
    }

    get address() {
        return this._address;
    }

    set city(city) {
        let pattern = RegExp('^[A-Za-z]{4,}$');
        if(pattern.test(city)) {
            this._city = city;
        } else throw "State Must have 4 Characters";
    }

    get city() {
        return this._city;
    }

    set state(state) {
        let pattern = RegExp('^[A-Za-z]{4,}$');
        if(pattern.test(state)) {
            this._state = state;
        } else throw "State Must have 4 Charactes";
    }

    get state() {
        return this._state;
    }

    set zip(zip){
        let Pattern = RegExp('^[0-9]{6}$');
        if(Pattern.test(zip)) {
            this._zip = zip;
        } else throw 'Zip Code must be of 6 digits only.';
    }

    get zip(){
        return this._zip;
    }

    set phoneno(phoneno) {
        let Pattern = RegExp('^[0-9]{2}|\\s|[0-9]{10}$');
        if(Pattern.test(phoneno)) {
            this._phoneno = phoneno;
        } else throw 'Invalid Phone No.';
    }

    get phoneno() {
        return this._phoneno;
    }

    set email(email){
        let Pattern = RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$');
        if(Pattern.test(email)){
            this._email = email;
        } else throw "Invalid Email ID";
    }

    get email() {
        return this._email;
    }

    toString(){
        return "First Name ="+ this.firstName
            + " Last Name ="+ this.lastName
            + " Address ="+ this.address
            + " City ="+ this.city
            + " State ="+ this.state
            + " Zip ="+ this.zip
            + " Phone No ="+ this.phoneno
            + " Email ="+ this.email;
    }
}

var addressBookArr = new Array();

function addressBookOptions() {
    do{
        console.log("***ADDRESS BOOK MANAGER***");
        console.log("1. ADD NEW CONTACT");
        console.log("2. EDIT CONTACT");
        console.log("3. DELETE CONTACT");
        console.log("4. DISPLAY CONTACTS");
        console.log("5. COUNT CONTACTS");
        console.log("6. SEARCH BY CITY");
        console.log("7. COUNT BY CITY");
        console.log("8. SORT BY FIRST NAME")
        console.log("13. EXIT");
        var choice = Number(readline.question());
        switch(choice) {
            case 1:
                newContact();
                break;
            case 2:
                editContact();
                break;
            case 3:
                deleteContact();
                break;
            case 4:
                console.log(addressBookArr);
                break;
            case 5:
                console.log("Total Contacts :"+countContacts());
                break;
            case 6:
                searchByCityState();
                break;
            case 7:
                countByCityState();
                break;    
            case 8:
                sortByName();
                break;
            case 9:
                console.log("Enter Choice to Sort Contact.");
                console.log("1. City \t 2. State \t 3. Zip");
                var sortchoice = Number(readline.question());
                sortByChoice(sortchoice);
                break;
            default:
                console.log("Invalid Choice.");
                break;
        }
    }while(choice!=13);
}

function newContact() {
    console.log("Enter the First Name :");
    let firstName = readline.question();
    if([...addressBookArr].filter(contact=>contact._firstName==firstName).reduce((present,firstName)=>present+=1,0))
    {
        console.log("The Given Person Name is Already Available")
    } else {
        console.log("Enter the Last Name :");
        let lastName = readline.question();
        console.log("Enter the Address :");
        let address = readline.question();
        console.log("Enter the City :");
        let city = readline.question();
        console.log("Enter the State :");
        let state = readline.question();
        console.log("Enter the Zip :");
        let zip = readline.question();
        console.log("Enter the Phone No :");
        let phoneno = readline.question();
        console.log("Enter the Email ID :");
        let email = readline.question();
        let contact = new Contact(firstName,lastName,address,city,state,zip,phoneno,email);
        addressBookArr.push(contact);
    }

}

function editContact() {
    console.log("Enter the First Name :");
    let firstName = readline.question();
    for(let contact of addressBookArr) {
        if(contact._firstName == firstName){
            console.log("Contact with First Name Found.");
            console.log("Enter the Last Name :");
            contact._lastName = readline.question();
            console.log("Enter the Address :");
            contact._address = readline.question();
            console.log("Enter the City :");
            contact._city = readline.question();
            console.log("Enter the State :");
            contact._state = readline.question();
            console.log("Enter the Zip :");
            contact._zip = readline.question();
            console.log("Enter the Phone No :");
            contact._phoneno = readline.question();
            console.log("Enter the Email ID :");
            contact._email = readline.question();        } 
    }
}

function deleteContact(){
    console.log("Enter the First Name :");
    let firstName = readline.question();
    for(let contact of addressBookArr) {
        if(contact._firstName == firstName){
            addressBookArr.splice(contact,1);
            console.log("Contact Deleted.")
        }
    }
}

function countContacts(){
    return [...addressBookArr].map(contact => contact._firstName).reduce((start,firstName)=>start+=1,0);
}

function searchByCityState() {
    console.log("Select Search Parameter 1. City 2. State :");
    let parameter = Number(readline.question);
    if(parameter == 1) {
        console.log("Enter the City to Search Person :");
        let city = readline.question();
        console.log([...addressBookArr].filter(contact => contact._city == city).map(contact => contact));
    } else {
        console.log("Enter the State to Search Person :");
        let state = readline.question();
        console.log([...addressBookArr].filter(contact => contact._state == state).map(contact => contact));
    }
}

function countByCityState() {
    let cityArr = new Array();
    let stateArr = new Array();
    [...addressBookArr].forEach(contact => cityArr[contact._city] ? cityArr[contact._city] += 1 : cityArr[contact._city] = 1);
    [...addressBookArr].forEach(contact => stateArr[contact._state] ? stateArr[contact._state] += 1 : stateArr[contact._state] = 1);

    console.log("City Counts :"+cityArr);
    console.log("State Counts :"+stateArr);
}
function sortByName(){
    addressBookArr.sort(function (a, b) {
        if (a._firstName > b._firstName) {
            return 1;
        }
        if (b._firstName > a._firstName) {
            return -1;
        }
        return 0;
    });
    console.log([...addressBookArr]);
}

function sortByChoice(sortchoice){
    if(sortchoice == 1) {
        addressBookArr.sort(function (a, b) {
            if (a._city > b._city) {
                return 1;
            }
            if (b._city > a._city) {
                return -1;
            }
            return 0;
        });
    }
    if(sortchoice == 2) {
        addressBookArr.sort(function (a, b) {
            if (a._state > b._state) {
                return 1;
            }
            if (b._state > a._state) {
                return -1;
            }
            return 0;
        });
    }
    if(sortchoice == 3) {
        addressBookArr.sort(function (a, b) {
            if (a._zip > b._zip) {
                return 1;
            }
            if (b._zip > a._zip) {
                return -1;
            }
            return 0;
        });
    }
    console.log([...addressBookArr]);
}

try{
    addressBookOptions();
} catch(e) {
    console.log(e);
}