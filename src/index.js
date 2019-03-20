/* ДЗ 4 - работа с DOM */

/*
 Задание 1:
 1.1: Функция должна создать элемент с тегом DIV
 1.2: В созданный элемент необходимо поместить текст, переданный в параметр text
 Пример:
   createDivWithText('2up') // создаст элемент div, поместит в него '2up' и вернет созданный элемент
 */
function createDivWithText(text) {
    let div = document.createElement('div');

    div.innerHTML = text;

    return div;
}

/*
 Задание 2:
 Функция должна вставлять элемент, переданный в переметре what в начало элемента, переданного в параметре where
 Пример:
   prepend(document.querySelector('#one'), document.querySelector('#two')) // добавит элемент переданный первым аргументом в начало элемента переданного вторым аргументом
 */
function prepend(what, where) {
    return where.prepend(what);
}

/*
 Задание 3:
 3.1: Функция должна перебрать все дочерние элементы узла, переданного в параметре where
 3.2: Функция должна вернуть массив, состоящий из тех дочерних элементов следующим соседом которых является элемент с тегом P
 Пример:
   Представим, что есть разметка:
   <body>
      <div></div>
      <p></p>
      <a></a>
      <span></span>
      <p></p>
   </dody>
   findAllPSiblings(document.body) // функция должна вернуть массив с элементами div и span т.к. следующим соседом этих элементов является элемент с тегом P
 */
function findAllPSiblings(where) {
    let arr = [];

    for (let i = 0; i < where.children.length - 1; i++) {
        if (where.children[i].nextElementSibling.tagName.toLowerCase() === 'p') {
            arr.push(where.children[i]);
        }
    }

    return arr;
}

/*
 Задание 4:
 Функция представленная ниже, перебирает все дочерние узлы типа "элемент" внутри узла переданного в параметре where и возвращает массив из текстового содержимого найденных элементов
 Но похоже, что в код функции закралась ошибка и она работает не так, как описано.
 Необходимо найти и исправить ошибку в коде так, чтобы функция работала так, как описано выше.
 Пример:
   Представим, что есть разметка:
   <body>
      <div>привет</div>
      <div>2up</div>
   </dody>
   findError(document.body) // функция должна вернуть массив с элементами 'привет' и '2up'
 */
function findError(where) {
    var result = [];

    for (var child of where.children) {
        result.push(child.innerText);
    }

    return result;
}

/*
 Задание 5:
 Функция должна перебрать все дочерние узлы элемента переданного в параметре where и удалить из него все текстовые узлы
 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов
 Пример:
   После выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
   должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    for (let i = 0; i < where.childNodes.length; i++) {
        if (!where.childNodes[i].tagName) {
            let text = where.childNodes[i];

            where.removeChild(text);
        }
    }

    return where.childNodes;
}

/*
 Задание 6:
 Выполнить предудыщее задание с использование рекурсии - то есть необходимо заходить внутрь каждого дочернего элемента (углубляться в дерево)
 Задачу необходимо решить без использования рекурсии, то есть можно не уходить вглубь дерева.
 Так же будьте внимательны при удалении узлов, т.к. можно получить неожиданное поведение при переборе узлов
 Пример:
   После выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
   должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */

function deleteTextNodesRecursive(where) {
    for (let i = 0; i < where.childNodes.length; i++) {
        if (!where.childNodes[i].tagName) {
            let text = where.childNodes[i];

            where.removeChild(text);
            i--;

        } else {
            let newWhere = where.childNodes[i];

            deleteTextNodesRecursive(newWhere);
            
        }
    }

    return where.childNodes;
}

/*
// или так

function deleteTextNodesRecursive(where) {
    let arr = [...where.childNodes];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].nodeType === 3) {
            where.removeChild(arr[i]);
        } else {
            deleteTextNodesRecursive(arr[i]);
        }
    }
}
*/

/*
 Задание 7 *:
 Необходимо собрать статистику по всем узлам внутри элемента переданного в параметре root и вернуть ее в виде объекта
 Статистика должна содержать:
 - количество текстовых узлов
 - количество элементов каждого класса
 - количество элементов каждого тега
 Для работы с классами рекомендуется использовать classList
 Постарайтесь не создавать глобальных переменных
 Пример:
   Для дерева <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">2up</b></div>
   должен быть возвращен такой объект:
   {
     tags: { DIV: 1, B: 2},
     classes: { "some-class-1": 2, "some-class-2": 1 },
     texts: 3
   }
 */
var stat = {
    tags: {},
    classes: {},
    texts: 0
}

function collectDOMStat(root) {
    var arr = [...root.childNodes];

    for (let i = 0; i < arr.length; i++) {
        if (!arr[i].tagName) {
            if (arr[i].nodeType === 3) {
                stat.texts +=1;
            } 
        } else {

            if (stat.tags[arr[i].tagName] >= 1) {
                stat.tags[arr[i].tagName] += 1;
            } else {
                stat.tags[arr[i].tagName] = 1;
            }

            if (arr[i].classList.length > 0) {
                let classList = arr[i].classList;

                for (let i = 0; i < classList.length; i++) {
                    if (stat.classes[classList[i]]) {
                        stat.classes[classList[i]] += 1;
                    } else {
                        stat.classes[classList[i]] = 1;
                    }
                }
            }
            collectDOMStat(arr[i]);
        }
    }

    return stat;
}

/*
 Задание 8 *:
 8.1: Функция должна отслеживать добавление и удаление элементов внутри элемента переданного в параметре where
 Как только в where добавляются или удаляются элементы,
 необходимо сообщать об этом при помощи вызова функции переданной в параметре fn
 8.2: При вызове fn необходимо передавать ей в качестве аргумента объект с двумя свойствами:
   - type: типа события (insert или remove)
   - nodes: массив из удаленных или добавленных элементов (в зависимости от события)
 8.3: Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 Рекомендуется использовать MutationObserver
 Пример:
   Если в where или в одного из его детей добавляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'insert',
     nodes: [div]
   }
   ------
   Если из where или из одного из его детей удаляется элемент div
   то fn должна быть вызвана с аргументом:
   {
     type: 'remove',
     nodes: [div]
   }
 */
function observeChildNodes(where, fn) {

    const observer = new MutationObserver(function(mutations) {
        mutations.map(function(mutation) {
            let type = mutation.type;
            let nodes = mutation.target;

            if (mutation.removedNodes.length) {
                type = 'remove';
                nodes = mutation.removedNodes;
            }
            
            if (mutation.addedNodes.length) {
                type = 'insert';
                nodes = mutation.addedNodes;
            }

            fn({
                type: type, 
                nodes: [...nodes]
            });
        })
    });

    let options = {
        'childList': true,
        'subtree': true
    }

    observer.observe(where, options);
}

export {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};