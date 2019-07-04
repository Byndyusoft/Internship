Дан код на node.js, осуществляющий постраничное скачивание некоторой информации:
```javascript
function downloadPagedItems() {
  const downloadedItems = [];
  let page = 1;
  while (true) {
    console.log("download page number " + page);
    let result = download(page);
    downloadedItems.push(...result.items);
    if (downloadedItems.length >= result.totalCount) return downloadedItems;
    page++;
  }
}
```
Здесь под функцией `download(page)` подразумевается обращение к внешнему ресурсу. Идея в том, что мы скачиваем постранично, пока не выкачаем всё, ориентируясь на `totalCount`.
В ходе эксплуатации кода, выяснилось, что бажные внешние сервисы могут для первой же страницы вернуть результат:
```javascript
function download(pageNumber) {
  return {
    items: [],
    totalCount: 2
  };
}
```
Что вызывает бесконечное зацикливание нашего кода.

**Задание:** написать unit-тест, отслеживающий такое зацикливание (т.е. падающий на нем). Предложить разные способы отслеживания такого поведения тестов, оценить плюсы и минусы каждого способа
