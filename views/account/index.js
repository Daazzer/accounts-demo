const delBtns = document.querySelectorAll('.del-btn');

delBtns.forEach(item => {
  item.addEventListener('click', evt => {
    if (!confirm('确定删除吗？')) {
      evt.preventDefault();
    }
  });
});
