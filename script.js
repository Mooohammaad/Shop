const currentVersion = 1; // إصدار البيانات الحالي
const storedVersion = localStorage.getItem('dataVersion');

// إذا كان إصدار البيانات غير موجود أو قديم، إعادة تعيين البيانات في التخزين المحلي
if (!storedVersion || parseInt(storedVersion) < currentVersion) {
    localStorage.setItem('items', JSON.stringify([
        { name: "سكر", price: 32 },
        { name: "رز", price: 26 },
        { name: "شاي", price: 10 },
        { name: "برشامة ابلونج", price: 1 },
        { name: "برشامة بيضه مدوره", price: 1 },
        { name: "برشامة مغص بني", price: 2 },
        { name: "برشامة مغص خضره", price: 2.5 },
        { name: "كيس صابون مواعين", price: 3 },
        { name: "صابون بريحه", price: 5 },
        { name: "صابونه جوي", price: 13 },
        { name: "سلك القطعه", price: 5 },
        { name: "لفة سلك", price: 10 },
        { name: "كيس ملح عادي", price: 3 },
        { name: "كيس ملح بونو", price: 3.5 },
        { name: "برشامة ريفو", price: 0.5 },
        { name: "برشامة كوتيفان", price: 1 },
        { name: "لوليته", price: 1 },
        { name: "كيس مكرونه نص كيلو", price: 12 },
        { name: "كيس شعريه ربع كيلو", price: 6 },
        { name: "كيلو دقيق", price: 20 },
        { name: "٥ شنط طويله رفيعه", price: 1 },
        { name: "٤ شنط طويله غليطه", price: 1 },
        { name: "٤ شنط صيدليه", price: 1 },
        { name: "لبانه فرقع", price: 1 },
        { name: "لبانه سماره", price: 0.5 },
        { name: "كيس فول سوداني", price: 28 },
        { name: "كوبايه وتلت كلور", price: 5 },
        { name: "كبس زهره", price: 6 },
        { name: "حقنه", price: 2 },
        { name: "قلم جاف", price: 3.5 },
        { name: "قلم رصاص", price: 2 },
        { name: "كيس بسبوسه", price: 22 },
        { name: "استيكه", price: 1 },
        { name: "برايه", price: 1 },
        { name: "مسطره", price: 1 },
        { name: "بامبز", price: 5 },
        { name: "برشامة مضاد حيوي", price: 2 },
        { name: "برشامه صفره للبط", price: 4 },
        { name: "برشامه بيضه للبط", price: 3 },
        { name: "خل", price: 10 },
        { name: "لب", price: 1 },
        { name: "كيس ازرق للبط", price: 2.5 },
        { name: "كيس اخضر للبط", price: 5 },
        { name: "طحنيه", price: 2 },
        { name: "كارتيه", price: 2 },
        { name: "خميره فوريه", price: 4 },
        { name: "عصير بودره كروز", price: 2 },
        { name: "بودره نمل", price: 10 },
        { name: "بسكويت ساده كبير", price: 5 },
        { name: "بسكويت ساده صغير", price: 2 },
        { name: "بيكنج بودر", price: 2.5 },
        { name: "فانيليا", price: 1 },
        { name: "كيس جلد انابيب", price: 1 },
        { name: "كيك شيف", price: 6 },
        { name: "قلم رصاص بلاستيك", price: 2.5 },
        { name: "بلستر اسود وشفاف", price: 4 }
    ]));
    localStorage.setItem('dataVersion', currentVersion); // تحديث إصدار البيانات في التخزين المحلي
}

let items = JSON.parse(localStorage.getItem('items'));

// حدث تفعيل البحث أثناء الكتابة
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.trim().toLowerCase();
    let filteredItems = items.filter(item => item.name.includes(searchTerm));

    if (searchTerm === '') {
        displayItems(items); // إذا كانت خانة البحث فارغة، عرض كل العناصر
    } else {
        displayItems(filteredItems); // عرض العناصر المصفاة بناءً على النص المدخل
    }
});

// عرض العناصر في الجدول
function displayItems(itemsToShow) {
    let tableBody = '';
    itemsToShow.forEach(item => {
        tableBody += `<tr><td>${item.name}</td><td>${item.price}</td></tr>`;
    });

    // إذا لم يتم العثور على أي عنصر، عرض رسالة بدلاً من الجدول
    if (itemsToShow.length === 0) {
        tableBody = '<tr><td colspan="2">لم يتم العثور على أي سلع.</td></tr>';
    }

    document.querySelector('#itemsTable tbody').innerHTML = tableBody;
}

// عرض كل العناصر عند تحميل الصفحة لأول مرة
displayItems(items);

// إضافة سلعة جديدة
document.getElementById('addItemButton').addEventListener('click', function() {
    const newItemName = document.getElementById('newItemName').value.trim();
    const newItemPrice = parseFloat(document.getElementById('newItemPrice').value);

    if (newItemName && !isNaN(newItemPrice)) {
        items.push({ name: newItemName, price: newItemPrice });
        localStorage.setItem('items', JSON.stringify(items)); // حفظ البيانات في localStorage
        displayItems(items);
        
        // إعادة تعيين حقول الإدخال
        document.getElementById('newItemName').value = '';
        document.getElementById('newItemPrice').value = '';
    } else {
        alert('يرجى إدخال اسم السلعة وسعر صالحين.');
    }
});