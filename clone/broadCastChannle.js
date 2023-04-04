let chId = 0;

function clone(data) {
  chId++;
  let cname = `__clone__${chId}`;
  let ch1 = new BroadcastChannel(cname);
  let ch2 = new BroadcastChannel(cname);

  return new Promise(resolve => {
    ch2.addEventListener('message', ev => resolve(ev.data), { once: true });
    ch1.postMessage(data);
  });
}

// 克隆对象
let obj1 = { a: { b: 1 } };
clone(obj1).then(function (o) {
  console.log('clone object');
  console.info(o, o === obj1);
  console.info('');
});

// 克隆时间
let obj2 = {
  a: new Date(),
};
clone(obj2).then(function (o) {
  console.info('clone object: include date');
  console.info(o, o === obj2, o.a.getFullYear());
  console.info('');
});

// 克隆正则表达式
let obj3 = {
  a: /[0-9]/,
};
clone(obj3).then(function (o) {
  console.info('clone object: include Rege');
  console.info(o, o === obj3, o.a.test(1));
});

// 克隆blob
let obj4 = {
  a: new Blob(['123']),
};
clone(obj4).then(function (o) {
  console.info('clone object: include blob');
  console.info(o, o === obj4);
  console.info('');
});

// 克隆window 对象, err
let obj5 = {
  a: 1,
  window,
};
clone(obj5)
  .then(function (o) {
    console.info(o, o === obj5);
  })
  .catch(err => {
    console.info('克隆Window:', err);
  });

// 克隆函数, err
let obj6 = {
  a: 1,
  fn: function fn() {
    return false;
  },
};
clone(obj6)
  .then(o => console.info(o, o === obj6))
  .catch(err => {
    console.info('克隆函数:', err);
  });
