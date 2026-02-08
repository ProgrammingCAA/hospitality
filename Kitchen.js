const container=document.getElementById("orders");

onValue(ref(db,"orders"),snapshot=>{
  container.innerHTML="";

  if(!snapshot.exists()){
    container.innerHTML="<p>لا توجد طلبات</p>";
    return;
  }

  const data=snapshot.val();

  Object.entries(data).forEach(([key,order])=>{

    const card=document.createElement("div");
    card.className="bg-[#2d1e1a] p-4 rounded";

    card.innerHTML=`
      <h3>${order.drink}</h3>
      <p>سكر: ${order.sugar||"بدون"}</p>
      <p>حليب: ${order.milk||"بدون"}</p>
      <p>${order.notes||""}</p>
      <p>${order.time}</p>

      <button onclick="done('${key}')"
      class="bg-green-600 w-full mt-2 py-2 rounded">
      تم التنفيذ
      </button>
    `;

    container.appendChild(card);
  });
});

window.done=(key)=>{
  remove(ref(db,"orders/"+key));
};
