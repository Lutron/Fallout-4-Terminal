var hancock = function() {
	this.banner = "Willkommen bei Termlink von ROBCO Industries (TM)\nBleib frei, Hancock. Bleib frei.\n\n";
	this.root = function() {
		menuln("[Monatliche Einnahmen]","monatlicheEinnahmen");
		menuln("[Geheimdienstbericht: Steinbruch]","steinbruch");
		menuln("[Geheimdienstbericht: Valentine]","valentine");
		menuln("[Geheimdienstbericht: Bruderschaft]","bruderschaft");
	}
	this.monatlicheEinnahmen = function() {
		println("Third Rail (1.000) - Wirklich klasse, Charlie und Magnolia sorgen dafür, dass die Kronkorken nur so fließen.");
		println();
		println("Hotel Rexford (100) - Marowski ist nicht mehr das, was er war.");
		println();
		println("Töten oder getötet werden (550) - Kleo hat \"sexy und unheimlich\" echt drauf. Das weiß ich.");	
		println();
		println("Daisys Rabatte (480) - Gute alte Daisy. Kann alles kaufen/verkaufen.");
		return "root";
	}
	this.steinbruch = function() {
		println("Händler berichten von erhöhter Gunner-Aktivität am Steinbruch. Muss ich im Blick behalten.");
		return "root";
	}
	this.valentine = function() {
		println("Gerüchte besagen, dass Valentine verschwunden ist. Skinny Malone könnte damit etwas zu tun haben. Ermordet? Unwahrscheinlich, denn Valentine ist zu gerissen dafür.");
		return "root";
	}
	this.bruderschaft = function() {
		println("Die Stählerne Bruderschaft ist gerade im großen Stil hier aufgetaucht. Muss mir dort Freunde suchen. Kann mir nicht leisten, ihre Pläne nicht zu kennen.");
		return "root";
	}
}