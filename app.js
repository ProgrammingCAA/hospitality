let selectedDrink = "";
let sugar = "";
let milk = "";

// اختيار مشروب
document.querySelectorAll(".drink").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".drink").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    selectedDrink=btn.dataset.drink;
  };
});

// السكر
document.querySelectorAll(".sugar").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".sugar").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    sugar=btn.dataset.value;
  };
});

// الحليب
document.querySelectorAll(".milk").forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll(".milk").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    milk=btn.dataset.value;
  };
});

// إرسال الطلب
document.getElementById("send").onclick=()=>{
  if(!selectedDrink){
    alert("اختاري المشروب");
    return;
  }

  push(ref(db,"orders"),{
    drink:selectedDrink,
    sugar,
    milk,
    notes:document.getElementById("notes").value,
    time:new Date().toLocaleTimeString()
  });

  alert("✅ تم إرسال الطلب");
  location.reload();
};
