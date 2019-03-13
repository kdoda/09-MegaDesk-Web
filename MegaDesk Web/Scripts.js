const DRAWERS_PRICE = 50;
const BASE_PRICE = 200;
const PRICES = {
    3: [60, 70, 80],
    5: [40, 50, 60],
    7: [30, 35, 40]
}

let submitButtonValue

function setSubmitButton(button) {
    submitButtonValue = button.value
}

function calculateTotalAmount() {
    let width = document.getElementById("width").value
    let depth = document.getElementById("depth").value
    let numberOfDrawers = document.getElementById("numberOfDrawers").value
    let material = document.getElementById("material")
    let materialParts = material.options[material.selectedIndex].value.split('-');
    let materialPrice = materialParts[0];
    let orderDays = document.getElementById("orderDays")
    orderDays = orderDays.options[orderDays.selectedIndex].value;

    let surfaceArea = width * depth;
    let extraSurfaceArea = surfaceArea - 1000;
    if (extraSurfaceArea < 0) {
        extraSurfaceArea = 0
    }

    let drawersPrice = numberOfDrawers * DRAWERS_PRICE
    let totalAmount = BASE_PRICE
        + extraSurfaceArea
        + drawersPrice
        + calculateOrderPrice(orderDays, surfaceArea)
        + materialPrice

    document.getElementById("totalAmount").value = totalAmount

    return submitButtonValue == "Add Quote" || submitButtonValue == "Submit Quote"
}

function calculateOrderPrice(orderDays, surfaceArea) {
    if (orderDays == 14)
        return 0

    let daysPrices = PRICES[orderDays]

    if (surfaceArea < 1000)
        return daysPrices[0]
    else if (1000 <= surfaceArea && surfaceArea <= 2000)
        return daysPrices[1]
    else
        return daysPrices[2]
}

function validateWidth() {
    
    if (!width.checkValidity()) {
        var width = document.getElementById("width")
        width.setCustomValidity("The width should be from 24 to 96.");
        let depthInput = document.getElementById("depth")
        depth.setCustomValidity("The depth should be from 12 to 48.");
        width.reportValidity();
    }
   
}

function validateDepth() {
    
    let depth = depthInput.value

    if (12 > depth || depth > 48) {
        
        depth.reportValidity()
    } else {
        depth.setCustomValidity();
    }
 
}