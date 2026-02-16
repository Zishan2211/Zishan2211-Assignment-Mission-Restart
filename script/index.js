const loadCategories = () => {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then((data) => displaycategories(data))
};

const filterProducts = (category) => {
    const url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;  //I did some research and apply...
    fetch(url)
        .then(res => res.json())
        .then(data => displayProducts(data))
};

const displayProducts = (products) => {
    const productContainer = document.getElementById("all-products-container");
    productContainer.innerHTML = "";

    products.forEach((product) => {
        console.log(product);
        const pCard = document.createElement("div");
        pCard.innerHTML = `
       <div class="card w-80 bg-base-100 shadow-xl">
                    <div class="p-6 h-3/4 flex justify-center bg-gray-200">
                        <img class="h-40 w-40" src="${product.image}" alt="" />
                    </div>
                    <div class="card-body space-y-2">
                        <div class="flex items-center justify-between">
                            <span class="bg-blue-300 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                               ${product.category}
                            </span>
                            <div class="flex items-center gap-1 text-sm">
                                <i class="fa-solid fa-star" style="color: rgba(255, 212, 59, 1);"></i> <span>${product.rating.rate}</span>
                                <span class="text-gray-400">${product.rating.count}</span>
                            </div>
                        </div>

                        <h2 class="text-1xl font-semibold">
                            ${product.title}
                        </h2>

                        <p class="text-xl font-bold">${product.price}</p>
                        <div class="card-actions justify-between pt-2">
                            <button class="btn btn-outline btn-primary h-8 w-32">
                                <i class="fa-solid fa-eye"></i> Details
                            </button>
                            <button class="btn btn-primary h-8 w-32">
                                <i class="fa-solid fa-cart-shopping"></i> Add
                            </button>
                        </div>
                    </div>
                </div>
        `
        productContainer.appendChild(pCard);
    })
}


displaycategories = (data) => {
    const categories = data.map(item => item.category);
    const SetCategories = [...new Set(categories)];
    const container = document.getElementById("all-categories-container");
    // container.innerHTML = "";

    SetCategories.forEach(category => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
    <button onclick="filterProducts(\`${category}\`)" 
    class="btn btn-outline btn-primary rounded">
        ${category}
    </button>
`;;
        container.appendChild(btnDiv);
    })
}


loadCategories();