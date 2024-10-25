# Тестове завдання 

### Загальний стек технологій: 
- node.js 18+
- express.js
- mongo/mongoose
- mustache або handlebars.

## Частина 1:
Написати веб-сервер, який буде відображати каталог автомобілів, розділений по категоріях. Всього має бути 3 типи сторінок:
- головна
- сторінка категорії
- сторінка автомобіля
---
### Сторінка автомобіля містить:
 - назву
 - ціну
 - колір
 - фотографію
 - опис автомобіля
 - a також "хлібні крихти" (breadcrumbs) з категорії та, можливо, батьківської(их) категорій.  
---
### Сторінка категорії містить:
 - назву
 - опис
 - фотографію
 - "хлібні крихти" з батьківських категорій
---
### Головна сторінка містить:
 - усі автомобілі, розбиті по категоріях, з посиланнями на самі автомобілі та сторінки категорій.  
---
Якість верстки, HTML або красивий зовнішній вигляд в даному випадку оцінюватися не будуть, для цього завдання важливіша технічна сторона.  

#### Бажано прикласти до завдання міграції для бази даних, щоб наповнити її тестовими даними.

#### Приклад URL-ів:
```
/ - main  
/category-1  
/category-1/category-2  
/category-1/car-1  
/category-1/category-2/car-2  
```
```
/
/toyota
/toyota/2007
/toyota/camry_3_5
/toyota/2007/camry_3_5
```
#### Опціонально, буде плюсом:
1. Описати, як конфігурувати застосунок для різних оточень: 
    - test 
    - stage
    - production
2. Додати тести
3. Додати dockerfile або інструкції, як завернути в Docker
4. Додати інструкції по запуску в k8s

## Частина 2:
Написати **CLI** команду для імпорту автомобілів і категорій у застосунок з ***Частини1*** з файлу. Джерелом імпорту може бути як **CSV** файл, так і **JSON** файл - обрати один зручний формат для реалізації, обидва підтримувати не потрібно. **Необхідно описати приклад запуску і формат даних у файлі.**

## Частина 3:
Для застосунку 1 зробити просту адмін панель, що складається з 2-х сторінок: 
сторінка логіну та сторінка зі списком автомобілів, на якій можна буде змінити назву, опис, ціну, колір і категорію автомобіля.  
Як і в ***Частині1*** - якість верстки і зовнішній вигляд оцінюватися не будуть.

