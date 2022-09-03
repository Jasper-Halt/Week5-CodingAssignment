class Reservations { // creates class for each reservation.
    constructor(name) {
        this.name = name;
        this.guests = []; // creates an array to contain the names of additional guests for each reservation.
    }
}
class Guest { // creates class for guests
    constructor(name) { // passes in name for each guest
        this.name = name;
    }
}
class Menu { // creates class for the menu that will be the interface.
    constructor() {
        this.reservations = []; // creates an array to contain the primary reservation names.
        this.selectedReservation = null; // starting value is "null" because, at start, no reservations have been selected.
    }
    start () { // add a method for the menu start.
    let selection = this.showMainMenuOptions(); 
    while (selection != 0) {
        switch (selection) { // a switch statement to lay out the main menu options.
            case "1":
                this.createReservation();
                break;
            case "2":
                this.editReservation();
                break;
            case "3":
                this.deleteReservation();
                break;
            case "4":
                this.displayReservations();
                break;
            default:
                selection = 0;
        }
        selection = this.showMainMenuOptions();
    }
    alert(`
    Thank you for using this RSVP app.

    If you did not complete your reservation
    or if any information changes,
    please complete or update before the event.

    We look forward to seeing you there!
    `); //message that will be displayed if user selects "0" to exit the menu.
    }
    showMainMenuOptions() {
        return prompt(`
        Welcome to this RSVP app.  Please select an option below:

            0. Exit

            1. Create a Reservation
            2. Edit/View Reservation
            3. Delete a Reservation
            4. View All Reservations
            `); //A multi-line string displaying the menu options.
    }
    showReservationMenuOptions(reservationInfo) { //a sub-menu for "Edit/View Reservations," allowing user to add or delete additional guests.
        return prompt(`
        Would you like to add an additional guest to your reservation?

        0. Return to Main Menu

        1. Add a Guest
        2. Delete a Guest
        ----------------
        ${reservationInfo}
        `);
    }
    createReservation() { //creates "createReservation" function that is part of the main menu.
        let name = prompt("Enter the primary name for your reservation.");
        this.reservations.push(new Reservations(name));
    }
    editReservation() { //creates "editReservation" function that is part of the main menu.
        let index = prompt("Enter the index for the reservation you wish to edit. The index for the first reservation is 0.");
        if (index > -1 && index < this.reservations.length) {
            this.selectedReservation = this.reservations[index]; 
            let description = "Name on Reservation: " + this.selectedReservation.name + "\n" + "Additional Guests:" + "\n";//displays guest name(s)
            for (let i = 0; i < this.selectedReservation.guests.length; i++) {
                description += i + ") " + this.selectedReservation.guests[i].name + "\n" 
                + "This reservation is for a party of " + (this.selectedReservation.guests.length + 1) + "." + "\n"; //displays total size of party.
            }
            let selection = this.showReservationMenuOptions(description); //creates sub-menu to allow user to add/delete additional guests.
            switch(selection) {
                case "1": 
                    this.createGuest();
                    break;
                case "2": 
                    this.deleteGuest();
        }
        }
    }
    createGuest() { // creates "createGuest" function that is part of the sub-menu.
        let name = prompt("Enter name for new guest.");
        this.selectedReservation.guests.push(new Guest(name)); //pushes new guest to the "guests" array.
    }
    deleteGuest() { // creates "deleteGuest" function that is part of the sub-menu.
        let index = prompt("Enter the index of the guest you wish to delete. The index of the first entry will be 0");
        if (index > -1 && index < this.selectedReservation.guests.length) {
            this.selectedReservation.guests.splice(index, 1); //splice method removes a single guest at the specified index from the "guests" array.
        }
    }
    deleteReservation() { //creates "deleteReservation" function that is part of the main menu.
        let index = prompt("Enter the index of the reservation you wish to delete. The index for the first entry will be 0");
        if (index > -1 && index < this.reservations.length) {
            this.reservations.splice(index, 1); //splice method removes a single reservation at the specified index from the "reservations" array.
        }
    }
    displayReservations() {   //creates "displayReservations" function that is part of the main menu.
        let reservationString = " "; //creates a blank string
        for (let i = 0; i < this.reservations.length; i++) { //iterates through the reservations so that it displays all that are created.
            reservationString += i + ") " + this.reservations[i].name + " has confirmed for this event." + "\n"
            + "Select Edit/View " + this.reservations[i].name + "'s reservation from the main menu for more details." + "\n"; 
        }
        alert(reservationString); 
    }
    
}
    let menu = new Menu();
    menu.start(); //executes the code and starts the menu.