var messages = {
    'en': {
        placeholder: 'Search',
        searchIconAccessibilityText: 'Click to search',
        listText: 'Use Up and Down arrow keys to select search item from',
        selectedItem: 'Current selected {{item}}',
        searchMessage: 'Search results for',
        skipContent: 'Skip to Content: ...',
        clear: 'Click to clear search box',
        searchFound: 'results found',
        noResultFound: 'No results found',
        viewMore: 'View more',
        customMessage: 'Please enter search keyword. Auto suggestions will be shown after 3 characters'
    },
    'es': {
        placeholder: 'Buscar',
        searchIconAccessibilityText: 'Haga clic para buscar',
        listText: 'Las teclas de flecha arriba y abajo del usuario para seleccionar el elemento de búsqueda de',
        selectedItem: 'Seleccionado actualmente {{item}}',
        searchMessage: 'Resultados de búsqueda para',
        skipContent: 'Saltar al contenido: ...',
        clear: 'Haga clic para borrar el cuadro de búsqueda',
        searchFound: 'resultados encontrados',
        noResultFound: 'No se han encontrado resultados',
        viewMore: 'Ver más',
        customMessage: 'Por favor introduzca la palabra clave de búsqueda. Se mostrarán autosugestiones después de 3 caracteres'
    },
    'ar': {
        placeholder: 'بحث',
        searchIconAccessibilityText: 'انقر للبحث',
        listText: 'استخدم مفاتيح الأسهم لأعلى ولأسفل لتحديد عنصر البحث من',
        selectedItem: 'المحدد الحالي {{item}}',
        searchMessage: 'نتائج البحث عن',
        skipContent: 'تخطى الى المحتوى: ...',
        clear: 'انقر لمسح مربع البحث',
        searchFound: 'العثور على نتائج',
        noResultFound: 'لا توجد نتائج',
        viewMore: 'عرض المزيد',
        customMessage: 'الرجاء إدخال كلمة البحث. سيتم عرض الاقتراحات التلقائية بعد 3 أحرف'
    }
};
/** common XMLHttpRequest for handling fetch request */
// currently using this XMLHttpRequest in search component to fetch the data
var xmlApi;
// Create the XHR request
var request = new XMLHttpRequest();
var fetchRequest = function (url, params) {
    // Return it as a Promise
    return new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onreadystatechange = function () {
            // Only run if the request is complete
            if (request.readyState !== 4) {
                return;
            }
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            }
            else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };
        // If error
        request.onerror = function () {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };
        // Setup our HTTP request
        request.open(params.method, url, true);
        // Setup our HTTP request headers
        if (params.headers) {
            Object.keys(params.headers).forEach(function (key) {
                request.setRequestHeader(key, params.headers[key]);
            });
        }
        // Send the request
        request.send(params.body);
    });
};
xmlApi = {
    // exporting XMLHttpRequest object to use in search component to abort the previous fetch calls
    request: request,
    fetchRequest: fetchRequest
};
var xmlApi$1 = xmlApi;
export { messages as m, xmlApi$1 as x };
