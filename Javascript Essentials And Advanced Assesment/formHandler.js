import { saveData, getData } from "./utils.js";

class CustomerFormHandler {
    constructor() {
        this.form = document.getElementById("customerForm");
        this.messageBox = document.getElementById("messageBox");

        this.form.addEventListener("submit", (e) => this.handleSubmit(e));
        this.form.addEventListener("input", () => this.validateForm()); 
    }

    validateForm() {
        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let email = document.getElementById("email").value.trim();
        let vehicle = document.getElementById("vehicle").value;
        let complaint = document.getElementById("complaint").value.trim();

        if (name.length < 3) return false;
        if (!/^\d{10}$/.test(phone)) return false;
        if (!/^\S+@\S+\.\S+$/.test(email)) return false;
        if (vehicle === "") return false;
        if (complaint.length < 10) return false;

        return true;
    }

    handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showMessage("Please fill all fields correctly!", "error");
            return;
        }

        let data = getData("customerData");

        data.push({
            name: name.value,
            phone: phone.value,
            email: email.value,
            vehicle: vehicle.value,
            complaint: complaint.value
        });

        saveData("customerData", data);
        this.clearForm();
        this.showMessage("Data saved successfully!", "success");
    }

    clearForm() {
        this.form.reset();
    }

    showMessage(msg, type) {
        this.messageBox.innerText = msg;
        this.messageBox.className = type;
        this.messageBox.style.display = "block";

        setTimeout(() => {
            this.messageBox.style.display = "none";
        }, 2000);
    }
}

new CustomerFormHandler();
