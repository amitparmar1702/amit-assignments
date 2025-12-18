import { getData } from "./utils.js";

class SubmissionViewer {
    constructor() {
        this.tableBody = document.querySelector("#dataTable tbody");
        this.search = document.getElementById("search");
        this.noData = document.getElementById("noData");

        this.loadData();

        this.search.addEventListener("input", () => this.filterData());
    }

    loadData() {
        this.data = getData("customerData");
        this.displayData(this.data);
    }

    displayData(records) {
        this.tableBody.innerHTML = "";

        if (records.length === 0) {
            this.noData.style.display = "block";
            return;
        }

        this.noData.style.display = "none";

        records.forEach(item => {
            let row = `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.phone}</td>
                    <td>${item.email}</td>
                    <td>${item.vehicle}</td>
                    <td>${item.complaint}</td>
                </tr>
            `;
            this.tableBody.innerHTML += row;
        });
    }

    filterData() {
        let value = this.search.value.toLowerCase();

        let filtered = this.data.filter(item =>
            item.name.toLowerCase().includes(value) ||
            item.vehicle.toLowerCase().includes(value)
        );

        this.displayData(filtered);
    }
}

new SubmissionViewer();
