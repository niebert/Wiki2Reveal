function handle_references(pwiki) {
    if (pwiki) {
      var vIconBook = "<img src='img/img-svg/fa-book-black.svg'> ";
      // (1) References without a citation label
      pwiki = pwiki.replace(/ ?<ref>([\s\S]{0,1000}?)<\/ref> ?/gi,vIconBook);
      // (2) Cite a reference by a label WITHOUT reference
      // replace <ref name="my book label"/> by "___CITE_7238234792_my_book_label___"
      pwiki = pwiki.replace(/ ?<ref[\s]+name=["']([^"'])["'][^>]{0,200}?\/> ?/gi,vIconBook);
      // (3) Reference with citation label that is used multiple time in a document by (2)
      pwiki = pwiki.replace(/ ?<ref [\s]+name=["']([^"'])["'][^>]{0,200}?>([\s\S]{0,1000}?)<\/ref> ?/gi,vIconBook);
    } else {
      pwiki = "";
    }
    return pwiki
}
