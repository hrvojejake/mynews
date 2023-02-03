#MyNews

Aplikacija se sastoji od Home, Latest News, Search, stranica pojedine kategorije te Error404 stranice. Za dobijanje vijesti je korišten New York Times API. 

#### Home
Na naslovnoj stranici su izlistane sve vijesti, te postoji sekcija Latest News i Favorite news. Klikom na zvjezdicu na članku, članak se stavlja na favorite listu i koja se sprema na local storageu.

#### Latest News
Za Latest News je implementiran infinite scroll te sam koristio News API iz razloga što podržava poziv paginationa. 

#### Search
U headeru aplikacije se nalazi search polje. Kad korisnik unese traženi pojam u search ništa se ne događa ako se korisnik ne nalazi na search stranici. Klikom na 
Search botun (na desktopu) ili botun povećala (na mobitelu) korisnik je odveden na Search stranicu te vidi rezultate pretrage. Ukoliko korisnik se već nalazi na Search stranici prilikom tipkanja u search polje šalje se pri promjeni novi zahtjev. Zbog tehničkih ograničenja od max 10 pretraga u minuti, dodijeljen je debounce od dvi sekunde, što otvara mogućnost errora ako se jako brzo listaju stranice, ali debounce od 6 sekundi bi bio loš user experience. PageSize za prtraživanje na New York Times API-u je 10, stoga sam dodao reklamu na početku i na kraju da ukupan broj artikala bude 12 te da stranica bude ispunjena.

#### Category page
Klikom na ikonu određene kategorije korisnik se usmjerava na stranicu te kategorije gdje su izlistani članci te kategorije. Neki članci mogu biti u više kategorija, ali u člancima se nalazi naziv kategorije koja je bila u dolaznim podacima. Ako članak nije imao kategoriju business, health, science, sports, ili technology, dodijeljena mu je kategorija general.
