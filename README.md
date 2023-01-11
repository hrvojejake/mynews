# Frontend task: MyNews

## Stranice aplikacije

Aplikacija se sastoji od Home, Latest News, Search, stranica pojedine kategorije te Error404 stranice

### Home

Na Home stranici se nalaze sve novosti(News), Latest news i Favorite articles.

#### News

Od artikala sve novosti, nalazi se njih prvih 11 te dvi reklame. Razlog za taj broj je što se na desktop verziji dizajna vijesti nalaze u dva područja, jedno je od prve 4 vijesti, a dalje su redovi od po tri vijesti. Može se staviti i 16 artikala, ali to mi je na prvu izgledalo kao dosta scrollanja do Favorite articles, koji se nalaze ispod News. Na mobitelu nije bilo takvog rasporeda pa se vide sve News. Ukoliko članak nema sliku, prikazuje placeholder sliku od MyNews.
U svrhu zadatka, dodao sam da jedan od prva četri članka bude kategorije Breaking, kako bi se vidio i taj prikaz. U dizajnu su se nalazile i reklame te sam dodao da sedmi i kasnije svaki šesti članak bude reklama koja je dodana iz posebnog ad.jsona. Na reklame se može kliknuti i odvest će na vanjsku stranicu. Ovo nije dodano člancima jer sam gledao da je ovo više pregled artikala.

Za News sam koristio API od New York Timesa jer su imali kategorije u podacima članaka. Jedino je izazov bio što imaju mnogo više kategirja nego je predviđeno, a nemaju General kategoriju, stoga sam svim člancima koji nemaju predviđene kategorije, zamijenio kategoriju u General. Drugi API nema nazive kategorija u podacima članaka, ali ima predviđenu kategoriju General. Da sam koristio ovaj API za News morao bi pozvat 6 requesta, svaki za svoju kategoriju, te po primitku podataka, svim člancima u pojedinoj kategoriji dodijeliti pripadajuću kategoriju. A to mi je izgledalo kao dosta čekanja za korisnika.

#### Latest News

Za Latest News je trebalo implementirati infinite scroll te sam koristio News API iz razloga što ima poziv pagea. Šteta je što se dobije samo 37 članaka te sam iz razbio na 4 zahtjeva po pageSize od 10. Alternativno sam mogao koristiti isto New York Times API, samo da se prilikom scrolla dole ne šalje zahtjev API-u nego se prikaže sljedećih 10 artikala. Međutim u svrhu zadatka sam napravio ovako. Na dnu modula Lates news ne nalazi botun See all news, dodao sam da je to link na posebnu stranicu Latest news.

#### Favorite articles

Klikom na zvjezdicu na članku u News ili bilokojoj kategoriji članak se dodaje na popis Favorite article. Da je članak dodan vidljivo je po ispunjenoj zvjezdici na članku te ih se kopija tog članka nalazi ispod Newsa na desktopu, odnosno klikom na Favorite botun na mobitelu. Favorite articles se spremaju u localstorage. Klikom na zvjezdicu članka koji se nalazi u popisu Favorite articles čalnak se miče iz tog popisa. Dizajnerski razlog za zvjezdice je jer su bile free ikone prazne i pune zvijezde, a crvena je brand boja.

### Category page

Klikom na ikonu određene kategorije korisnik se usmjerava na stranicu te kategorije gdje su izlistani članci te kategorije. Neki članci mogu biti u više kategorija, ali u člancima se nalazi naziv kategorije koja je bila u dolaznim podacima. Ako članak nije imao kategoriju business, health, science, sports, ili technology, dodijeljena mu je kategorija general.

### Search

U headeru aplikacije se nalazi search polje. Kad korisnik unese traženi pojam u search ništa se ne događa ako se korisnik ne nalazi na search stranici. Klikom na Search botun (na desktopu) ili borun povečala (na mobitelu) korisnik je odveden na Search stranicu te vidi rezultate pretrage. Ukoliko korisnik se već nalazi na Search stranici prilikom tipkanja u search polje šalje se pri promjeni novi zahtjev. Zbog tehničkih ograničenja od max 10 pretraga u minuti, dodijenjen je debounce od dvi sekunde, što otvara mogućnost errora ako se jako brzo listaju stranice, ali debounce od 6 sekundi bi bilo preloš user experience. PageSize za prtraživanje na New York Times API-u je 10, stoga sam dodao reklamu na početku i na kraju da ukupan broj artikala bude 12 te da stranica bude ispunjena.

#### Call to action

Na vrhu aplikacije se nalazi tekst: 'Make MyNews your homepage' i 'Every day discover what’s trending on the internet!'. Nisam siguran što bi to bilo, pretpostavio sam nekakav call to action stoga sam dodao da klikom na botun GET se otvori pop-up prozor s instrukcijama kako stranicu pinat na Home screen na mobitelu ili dodati kao default page na Chromu. Klikom na Close it zatvara se prozor, a klikom na No, thanks nestaje cijelo call to action polje.
