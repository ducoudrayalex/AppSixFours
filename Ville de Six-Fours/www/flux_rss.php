<?php
function &init_news_rss(&$xml_file)
{
        $root = $xml_file->createElement("rss"); // création de l'élément
        $root->setAttribute("version", "2.0"); // on lui ajoute un attribut
        $root = $xml_file->appendChild($root); // on l'insère dans le noeud parent (ici root qui est "rss")
       
        $channel = $xml_file->createElement("channel");
        $channel = $root->appendChild($channel);
               
        $desc = $xml_file->createElement("description");
        $desc = $channel->appendChild($desc);
        $text_desc = $xml_file->createTextNode("Les acutalités de Six-Fours-Les-Plages"); // on insère du texte entre les balises <description></description>
        $text_desc = $desc->appendChild($text_desc);
       
        $link = $xml_file->createElement("link");
        $link = $channel->appendChild($link);
        $text_link = $xml_file->createTextNode("http://www.ville-six-fours.fr");
        $text_link = $link->appendChild($text_link);
       
        /*$title = $xml_file->createElement("title");
        $title = $channel->appendChild($title);
        $text_title = $xml_file->createTextNode("Actus 6FOURS");
        $text_title = $title->appendChild($text_title);
       */
        return $channel;
}
 
//function add_news_node(&$parent, $root, $id, $pseudo, $titre, $contenu, $date)
function add_news_node(&$parent, $root, $id, $titre, $contenu, $date, $guide, $image)
{
        $item = $parent->createElement("item");
        $item = $root->appendChild($item);

        $title = $parent->createElement("title");
        $title = $item->appendChild($title);
        $text_title = $parent->createTextNode($titre);
        $text_title = $title->appendChild($text_title);
/* 
        $link = $parent->createElement("link");
        $link = $item->appendChild($link);
        $text_link = $parent->createTextNode("http://www.ville-six-fours.fr/rss_news".$id.".html");
        $text_link = $link->appendChild($text_link); */

        $desc = $parent->createElement("description");
        $desc = $item->appendChild($desc);
        $text_desc = $parent->createTextNode($contenu);
        $text_desc = $desc->appendChild($text_desc);
/* 
        $com = $parent->createElement("comments");
        $com = $item->appendChild($com);
        $text_com = $parent->createTextNode("http://www.bougiemind.info/news-11-".$id.".html");
        $text_com = $com->appendChild($text_com); */
/*        
        $author = $parent->createElement("author");
        $author = $item->appendChild($author);
        $text_author = $parent->createTextNode($pseudo);
        $text_author = $author->appendChild($text_author);
 */
        $pubdate = $parent->createElement("pubDate");
        $pubdate = $item->appendChild($pubdate);
        $text_date = $parent->createTextNode($date);
        $text_date = $pubdate->appendChild($text_date);
 
        $guid = $parent->createElement("guid");
        $guid = $item->appendChild($guid);
        $text_guid = $parent->createTextNode($guide);
        $text_guid = $guid->appendChild($text_guid);

        $img = $parent->createElement("illustr");
        $img = $item->appendChild($img);
        $text_img = $parent->createTextNode($image);
        $text_img = $img->appendChild($text_img);
/* 		
        $src = $parent->createElement("source");
        $src = $item->appendChild($src);
        $text_src = $parent->createTextNode("http://www.bougiemind.info");
        $text_src = $src->appendChild($text_src); */
}
 
function rebuild_rss()
{
    $host_name  = "db405036267.db.1and1.com";
    $database   = "db405036267";
    $user_name  = "dbo405036267";
    $password   = "wp@83140";

    $connect = mysqli_connect($host_name, $user_name, $password, $database);
    if (mysqli_connect_errno())
    {
		echo "La connexion au serveur MySQL n'a pas abouti : " . mysqli_connect_error();
    }
	
	


        // on se connecte à la BDD
		//$con = mysqli_connect('localhost','root','','db405036267');
		//$con = mysqli_connect('db405036267.db.1and1.com','dbo405036267','wp@83140','db405036267');
		// Check connection
		//if (mysqli_connect_errno())
		//  {
		//  echo "Failed to connect to MySQL: " . mysqli_connect_error();
		//  }
		//mysql_connect("db405036267.db.1and1.com", "dbo405036267", "wp@83140");
        //mysql_select_db("db405036267");
 
        // on récupère les news
//        $nws = mysqli_query($con,'SELECT ID, post_title, post_content, post_date, guid, post_mime_type FROM mesarticles WHERE ID = 95');
        $nws = mysqli_query($connect,'SELECT `p1`.`ID` idpost, `p1`.`post_title` titlepost, `p1`.`post_date` datepost, `p1`.`post_content` contentpost, `p1`.`guid` guid1, `p2`.`ID`, `p2`.`post_parent`, `p2`.`guid` guid2 FROM `wp2014_posts` `p1`, `wp2014_posts` `p2` WHERE `p1`.`ID` = 5148 AND `p2`.`post_parent` = `p1`.`ID`');
        //$nws = mysqli_query($connect,'SELECT ID idpost, post_title titlepost, post_date datepost, post_content contentpost, guid guid1, post_parent FROM wp2014_posts WHERE ID = 5148');
 
        // on crée le fichier XML
        $xml_file = new DOMDocument("1.0");
 
        // on initialise le fichier XML pour le flux RSS
        $channel = init_news_rss($xml_file);
 
        // on ajoute chaque news au fichier RSS
        while($news = mysqli_fetch_assoc($nws))
        {
				//add_news_node($xml_file, $channel, $news["ID"], $news["post_title"], $news["post_name"], $news["guid"], date("d/m/Y H:i", $news["post_modified"]));
                add_news_node($xml_file, $channel, $news["idpost"], iconv('ISO-8859-1', 'UTF-8', $news["titlepost"]), iconv('ISO-8859-1', 'UTF-8', $news["contentpost"]), $news["datepost"], $news["guid1"], $news["guid2"]);
        }
        // on écrit le fichier
        $xml_file->save("news_FR_flux.xml");
}
?>