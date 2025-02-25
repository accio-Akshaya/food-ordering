
async function getMenu() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json');
        const menuItems = await response.json();
        displayMenu(menuItems);
    } catch (error) {
        console.error("Error fetching menu:", error);
    }
}

function displayMenu(menuItems) {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = ''; 

    menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        menuItem.classList.add('menu-item');

        menuItem.innerHTML = `
            <div class="image">
                <img src="${item.imgSrc}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div class="details">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <button class="add-btn" onclick="addToOrder('${item.name}')">+</button>
            </div>
        `;

        menuList.appendChild(menuItem);
    });
}


function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            fetch('https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json')
                .then(response => response.json())
                .then(menuItems => {
                    let order = [];
                    let burgerItems = menuItems.filter(item => item.category === "Burger");
                    for (let i = 0; i < 3; i++) {
                        let randomBurger = burgerItems[Math.floor(Math.random() * burgerItems.length)];
                        order.push(randomBurger);
                    }
                    console.log("Order placed:", order);
                    resolve(order);
                });
        }, 2500);
    });
}


function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Order is being prepared...");
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}


function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Payment successful.");
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}


function thankyouFnc() {
    alert(`Thank you for ordering with us!`);
}


let userOrder = [];
function addToOrder(itemName) {
    userOrder.push(itemName);
    console.log(`Added ${itemName} to the order.`);
}


function completeOrderProcess() {
    takeOrder()
        .then(orderPrep)
        .then(payOrder)
        .then((paymentStatus) => {
            if (paymentStatus.paid) {
                thankyouFnc();
            }
        })
        .catch(error => console.error("Error in order process:", error));
}


document.addEventListener("DOMContentLoaded", getMenu);
