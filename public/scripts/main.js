document.getElementById('category').addEventListener('change', function () {
  const selectedCategoryId = this.value;
  const subcategorySelect = document.getElementById('subcategory');
  const categoriesData = JSON.parse(document.getElementById('categoriesData').textContent);

  subcategorySelect.innerHTML = '';
  const selectedCategory = categoriesData.find(cat => cat._id === selectedCategoryId);

  if (selectedCategory && selectedCategory.subcategories.length > 0) {
    selectedCategory.subcategories.forEach(sub => {
      const option = document.createElement('option');
      option.value = sub._id;
      option.textContent = sub.name;
      if (sub._id === '{{car.subcategory._id}}') {
        option.selected = true;
      }
      subcategorySelect.appendChild(option);
    });
  }
});

// export function 