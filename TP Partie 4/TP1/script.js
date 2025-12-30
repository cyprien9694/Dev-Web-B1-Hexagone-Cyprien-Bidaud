//script.js
let library = [];
function addBook(book) {
    if (book.title && book.author && book.publicationYear !== undefined && typeof book.borrowed === "boolean") {
        library.push(book);
        console.log(`Livre ajouté : "${book.title}" par ${book.author}`);
    } else {
        console.log("Livre invalide. Veuillez vérifier les propriétés.");
    }
}
addBook({ title: "Le Petit Prince", author: "Antoine de Saint-Exupéry", publicationYear: 1943, borrowed: false });
addBook({ title: "L'Étranger", author: "Albert Camus", publicationYear: 1942, borrowed: true });
addBook({ title: "Les Misérables", author: "Victor Hugo", publicationYear: 1862, borrowed: false });
console.log("Bibliothèque actuelle :");
console.table(library);

function displayBooks() {
    console.log("Livres disponibles dans la bibliothèque :");
    let availableBooks = library.filter(book => book.borrowed === false);

    if (availableBooks.length === 0) {
        console.error("Aucun livre disponible.");
    } else {
        availableBooks.forEach(book => {
            console.log(`- "${book.title}" par ${book.author} (${book.publicationYear})`);
        });
    }
}
displayBooks();
function searchByTitle(title) {
    return library.find(book => book.title.toLowerCase() === title.toLowerCase());
}
function borrowBook(title) {
    const book = searchByTitle(title);
    if (!book) {
        console.log(`Le livre "${title}" n'existe pas dans la bibliothèque.`);
    } else if (book.borrowed) {
        console.log(`Le livre "${title}" est déjà emprunté.`);
    } else {
        book.borrowed = true;
        console.log(`Vous avez emprunté "${title}".`);
    }
}
function returnBook(title) {
    const book = searchByTitle(title);
    if (!book) {
        console.log(`Le livre "${title}" n'existe pas dans la bibliothèque.`);
    } else if (!book.borrowed) {
        console.log(`Le livre "${title}" n'était pas emprunté.`);
    } else {
        book.borrowed = false;
        console.log(`Vous avez rendus "${title}".`);
    }
}
returnBook("Le Petit Prince");
