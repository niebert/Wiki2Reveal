// defaultdb.js
vDataJSON.wikipage = `
== Topologischer Raum ==
Ein '''Topologischer Raum''' ist der grundlegende Gegenstand der Teildisziplin [https://de.wikipedia.org/wiki/Topologie_(Mathematik) Topologie] der [https://de.wikipedia.org/wiki/Mathematik Mathematik]. Durch die Einführung einer topologischen Struktur auf einer Menge lassen sich

* intuitive Lagebeziehungen wie „Nähe“ und
* „Konvergenz gegen“ aus den reellen Zahlen <math>{\mathbb R}</math> bzw. aus dem <math>{\mathbb R}^{n}</math>

auf viele und sehr allgemeine Strukturen übertragen (wie z.B. die Topologie von Funktionenräumen).
[[Datei:Audio0 intro normen metrik topologie.ogg|mini|Intro]]
[[Datei:Audio1 topologie abstraktion.ogg|mini|Topologie allgemein]]

== Definition: Topologie ==
Eine ''Topologie'' ist ein [https://de.wikipedia.org/wiki/Mengensystem Mengensystem] <math>\cal T</math> bestehend aus Teilmengen (''[https://de.wikipedia.org/wiki/offene_Menge offene Mengen]'' genannt) einer Grundmenge <math>X</math>, für die  die folgenden [https://de.wikipedia.org/wiki/Axiom Axiome] erfüllt sind

* (T1) <math>\emptyset, X \in \cal T</math>
* (T2) <math>U \cap V \in \cal T</math> für alle <math>U,V \in  \cal T</math>.
* (T3) Für eine beliebige Indexmenge <math>I</math> und <math>U_i \in \cal T</math> für alle <math>i \in I</math> gilt: <math>\bigcup_{i \in I} U_i \in \cal T</math>.
Eine Menge <math>X</math> zusammen mit einer Topologie <math>\cal T</math> auf <math>X</math> heißt ''[https://de.wikipedia.org/wiki/Topologischer_Raum topologischer Raum]'' <math>(X,\cal T)</math>.
[[Datei:Audio2 def topologie.ogg|mini|Definition Topologie]]

== Beispiel: Topologie auf Texten ==
In der Regel geht man davon aus, dass Topologien auf mathematischen Objekten definiert werden (z.B. Zahlenräume, Funktionenräume, (topologische) Gruppen, Vektorräume, ...). Die Allgemeinheit der Definition macht es aber auch möglich, eine [[Topologie auf Texten]] zu definieren. Dies Beispiel wurde ergänzt, weil rein anschaulich z.B. Texte in der deutschen Sprache
* eine ähnliche Aussage haben können und
* unterschiede Wörter verwenden.
Diese Ähnlichkeit der Semantik oder auch Syntax wird als Übung in "[[Topologie auf Texten]]" näher untersucht.
[[Datei:Audio3 topologie texte.ogg|mini]]

== Hierachie Topologischer Räume ==
[[Datei:Beziehungen zwischen mathematischen Räumen.svg|300px|Hierarchie Topologischer Räume]]
[[Datei:Audio4 hierarchie.ogg|mini]]

== Bedeutung: Notation Topologie ==
* (T1) <math>\emptyset, X \in \mathcal{T}</math> [https://de.wikipedia.org/wiki/leere_Menge leere Menge] und die [https://de.wikipedia.org/wiki/Grundmenge Grundmenge] <math>X</math> sind offene Mengen
* (T2) <math>U \cap V \in \mathcal{T}</math> für alle <math>U,V \in \mathcal{T}</math>: Der [https://de.wikipedia.org/wiki/Schnittmenge Durchschnitt] endlich vieler offener Mengen ist eine offene Menge.
* (T3) Die [https://de.wikipedia.org/wiki/Vereinigungsmenge Vereinigung] beliebig vieler offener Mengen ist wieder eine offene Menge.
[[Datei:Audio5 notation tr.ogg|mini]]

== Semantik: Metrik ==
Eine Metrik <math>d</math> ordnet mit <math>d(x,y)</math> zwei Elementen <math>x,y \in X</math> aus einem Grundraum <math>X</math> den Abstand <math>d(x,y)</math> zwischen <math>x</math> und <math>y</math> zu.
[[Datei:Audio6 metrik abstand.ogg|mini]]

== Definition: Metrik ==
Sei <math>X</math> eine beliebige Menge. Eine [https://de.wikipedia.org/wiki/Funktion_(Mathematik) Abbildung] <math>d\colon X\times X\to \mathbb{R}</math> heißt Metrik auf <math>X</math>, wenn für beliebige Elemente <math>x</math>, <math>y</math> und <math>z</math> von <math>X</math> die folgenden [https://de.wikipedia.org/wiki/Axiom Axiome] erfüllt sind:

* (M1) Trennung: <math>d\left(x,y\right) = 0 \Leftrightarrow x = y</math>,
* (M2) Symmetrie: <math>d\left(x,y\right) = d(y,x)</math>,
* (M3) [https://de.wikipedia.org/wiki/Dreiecksungleichung Dreiecksungleichung]:  <math>d\left(x,y\right) \leq d(x,z) + d(z,y)</math>.
[[Datei:Audio7 def abstand.ogg|mini]]

== Veranschaulichung: Metrik Dreiecksungleichung ==
[[File:Metrik_triangle_inequality.svg|300px|Nach der Dreiecksungleichung ist der Abstand zwischen zwei Punkten X,Y höchstens so groß wie Summe der Abstände von X zu Z und von Z zu Y, also einem Umweg über den Punkt Z]]
[[Datei:Audio8 metrik dreiecksungleichung.ogg|mini]]

== Nicht-Negativität ==
Aus den drei Eigenschaften der Metrik folgt die Nicht-Negativität, d.h. für alle <math>x,y \in X</math> gilt. <math>d(x,y)\geq0</math>. Die Nicht-Negativität folgt aus den anderen Eigenschaften mit:

:<math>0 = \frac{1}{2} d(x, x) \leq \frac{1}{2}(d(x, y) + d(y, x)) = </math>
<math>= \frac{1}{2}(d(x, y) + d(y, x)) = \frac{1}{2}(d(x, y) + d(x, y)) = d(x, y).</math>
[[Datei:Audio9 nicht negativitaet.ogg|mini]]

== Offene Mengen in metrischen Räumen ==
* In einem metrische Raum <math>(X,d)</math> definiert man eine Menge <math>U \subset X</math> als offen (d.h. <math>U \in \mathcal{T}_d</math>), wenn es zu jedem <math>u\in U</math> ein <math>\epsilon >0</math> gibt, dass die <math>\epsilon</math>-Kugel <math>B_\epsilon^d(u):=\{\ x \in X | \ d(x,u)< \epsilon \}</math> ganz in <math>U</math> liegt (d.h. <math>B_\epsilon^d(u) \subset U </math>)
* Zeigen Sie, dass mit diesem definierten <math>\mathcal{T}_d</math> das Paar  <math>(X,\mathcal{T}_d)</math> ein topologischer Raum ist (d.h. (T1), (T2), (T3) erfüllt).
[[Datei:Audio10 metrik topologischer raum.ogg|mini]]

== Definition: Norm ==
Eine Norm ist eine [https://de.wikipedia.org/wiki/Funktion_(Mathematik) Abbildung] <math>\|\cdot\|</math> von einem [https://de.wikipedia.org/wiki/Vektorraum Vektorraum] <math>V</math> über dem [https://de.wikipedia.org/wiki/Körper_(Algebra) Körper] <math>\mathbb K</math> der [https://de.wikipedia.org/wiki/Reelle_Zahl reellen] oder der [https://de.wikipedia.org/wiki/Komplexe_Zahl komplexen Zahlen] in die Menge der nichtnegativen [https://de.wikipedia.org/wiki/Reelle_Zahl reellen Zahlen] <math>{\mathbb R}_0^{+}</math>.

:<math>\|\cdot\|\colon V\to{\mathbb R}_0^{+}, \; x \mapsto \| x \|,</math>

Erfüllt <math>\|\cdot\|</math> die [https://de.wikipedia.org/wiki/Axiom Axiome] N1,N2, N3, so heißt <math>\|\cdot\|</math> Norm auf <math>V</math>.

* (N1) [https://de.wikipedia.org/wiki/Definitheit Definitheit]:  <math>\|x\| = 0  \;\Rightarrow\;  x = 0</math> für alle  <math>x \in V</math>,
* (N2) [https://de.wikipedia.org/wiki/Homogene_Funktion absolute Homogenität]:  <math>\|\lambda\cdot x\| = |\lambda|\cdot\|x\|</math> für alle  <math>x\in V</math> und  <math>\lambda\in \mathbb K</math>
* (N3) [https://de.wikipedia.org/wiki/Dreiecksungleichung Dreiecksungleichung]:  <math>\|x + y\| \leq \|x\| + \|y\|</math> für alle <math>x, y\in V</math>.

[[Datei:Audio11 def norm.ogg|mini]]

== Normierter Raum / Metrischer Raum ==
Ein normierter Raum <math>(V,\|\cdot\| )</math> ist zugleich auch ein metrischer Raum.
* Ein Norm  <math>\|\cdot\| </math> ordnet einem Vektor <math>v\in V </math> seine Vektorlänge <math>\|v\| </math> zu.
* Mit der Norm <math>\|\cdot\| </math> kann man über <math>d(x,y):=\| x-y \| </math> eine Metrik definieren.
* Zeigen Sie, dass die so definierte Abbildung <math>d:V\times V \rightarrow \mathbb{R}</math> die Eigenschaften einer Metrik erfüllt.
[[Datei:Audio12 norm metrik zusammenhang.ogg|mini]]

== Notation: Norm ==
* In dem Axiom (N2) <math> \| \lambda \cdot x \| = | \lambda | \cdot \|x\| </math> bezeichnet <math>| \cdot |</math> den [https://de.wikipedia.org/wiki/Betragsfunktion Betrag] des [https://de.wikipedia.org/wiki/Skalar Skalars]. '''"<math>\cdot</math>"'''-Zeichen: Äußere Verknüpfung im Vektorraum bzw. Multiplikation <math>(\mathbb{R},\cdot)</math>.
* <math>\|x\|</math> gibt die Länge des Vektors <math>x\in V</math> an.
* In (N3) <math>\|x + y\| \leq \|x\| + \|y\|</math> für alle <math>x, y\in V</math>. '''"<math>+</math>"'''-Zeichen bezeichnet zwei unterschiedliche Verknüpfungen (d.h. Addition in <math>(V,+)</math> bzw. <math>(\mathbb{R},+)</math>
[[Datei:Audio13 notatin norm.ogg|mini]]

== Veranschaulichung: Norm Dreiecksungleichung ==
[[File:Vector-triangle-inequality.svg|300px|Nach der Dreiecksungleichung ist die Länge der Summe zweier Vektoren höchstens so groß wie die Summe der Längen der einzelnen Vektoren]]
[[Datei:Audio14 norm dreiecksungleichung.ogg|mini]]

== Def: Konvergenz im normierten Raum ==
Sei <math>(V,\|\cdot\|)</math> ein normierter Raum und <math>(v_n)_{n\in\mathbb{N}} \in V^{\mathbb{N}}</math> eine Folge in <math>V</math> und <math>v_o \in V</math>:
:<math> \lim_{n \to \infty}^{\|\cdot\|} v_n = v_o \ :\Longleftrightarrow \ \forall_{\epsilon > 0} \exists_{n_\epsilon \in \mathbb{N}} \forall_{n \geq n_\epsilon} \ : \  \|v_n - v_o\| < \epsilon </math>
[[Datei:Audio15 def konvergenz norm.ogg|mini|audio15_def_konvergenz_norm.ogg]]

== Def: Konvergenz im metrischen Raum ==
Sei <math>(X,d)</math> ein metrischer Raum und <math>(x_n)_{n\in\mathbb{N}} \in X^{\mathbb{N}}</math> eine Folge in <math>X</math> und <math>x_o \in X</math>:
:<math> \lim_{n \to \infty}^d x_n = x_o \ :\Longleftrightarrow \ \forall_{\epsilon > 0} \exists_{n_\epsilon \in \mathbb{N}} \forall_{n \geq n_\epsilon} \ : \  d(x_n,x_o) < \epsilon </math>
[[Datei:Audio16 def konvergenz metrik.ogg|mini]]

== Äquivalenz: Normen ==
Seien zwei Normen <math>\|\cdot\|_1 </math> und <math>\|\cdot\|_2</math> auf dem <math>\mathbb K</math>-Vektorraum <math>V</math> gegeben. Die beiden Normen sind äquivalent, wenn gilt:

:<math>\exists_{C_1,C_2 >0} \forall_{x \in V} \ : \ C_1 \|x\|_1 \leq \|x\|_2 \leq C_2 \|x\|_1</math>

Zeigen Sie, dass eine Folge  genau dann in <math>\|\cdot\|_1 </math> konvergiert, wenn es auch bzgl. <math>\|\cdot\|_2</math> konvergiert.
[[Datei:Audio17 aequivalenz normen.ogg|mini|audio17_aequivalenz_normen.ogg]]

== Betrag in komplexen Zahlen ==
Sei <math>z=z_1 + i\cdot z_2\in \mathbb{C}</math> eine komplexe Zahl mit <math>z_1, z_2\in \mathbb{R}</math>. Zeigen Sie, dass <math>|z|:=\sqrt{z\cdot \overline{z}} </math> eine Norm auf dem <math>\mathbb{R}</math>-Vektorraum <math>\mathbb{C}</math> ist!
[[Datei:Audio18 norm komplexe zahlen.ogg|mini|audio18_norm_komplexe_zahlen.ogg]]

== Historische Anmerkung: Norm ==
Diese axiomatische Definition der Norm wurde von [https://de.wikipedia.org/wiki/Stefan_Banach Stefan Banach] 1922 in seiner Dissertation aufgestellt Das heute übliche Normsymbol wurde erstmals von [https://de.wikipedia.org/wiki/Erhard_Schmidt Erhard Schmidt] 1908 als Abstand <math>\|x-y\|</math> zwischen Vektoren <math>x</math> und <math>y</math> verwendet.
[[Datei:Audio19 norm historische anmerkung.ogg|mini]]

== Seiten-Information ==
Der '''[https://niebert.github.io/Wiki2Reveal/wiki2reveal.html?domain=wikiversity&title=Normen%2C+Metriken%2C+Topologie&author=Funktionalanalysis&language=de&audioslide=yes Foliensatz]''' wurde für den '''[https://de.wikiversity.org/wiki/Kurs:Funktionalanalysis Kurs:Funktionalanalysis]''' mit [[v:en:Wiki2Reveal|Wiki2Reveal]] über den [https://niebert.github.io/Wiki2Reveal/ Linkgenerator] erstellt.
* Inhalte der Seite basieren auf:
** [https://de.wikipedia.org/wiki/Topologie_(Mathematik) https://de.wikipedia.org/wiki/Topologie_(Mathematik)]
** [https://de.wikipedia.org/wiki/Metrischer_Raum https://de.wikipedia.org/wiki/Metrischer_Raum]
** [https://de.wikipedia.org/wiki/Normierter_Raum https://de.wikipedia.org/wiki/Normierter_Raum]
* Diese Seite ist ein [https://de.wikiversity.org/wiki/PanDocElectron-Presentation PanDocElectron-SLIDE] Dokumententyp
* Quelle: Wikiversity DE https://de.wikiversity.org/wiki/Normen,_Metriken,_Topologie
* siehe [[v:en:Wiki2Reveal|Wiki2Reveal]] zur Funktionsweise von [https://niebert.github.io/Wiki2Reveal/ Wiki2Reveal].
* Nächste Inhalte des Kurses sind [[Netze (Mathematik)|Netze]]

[[Category:Wiki2Reveal]]

`;
