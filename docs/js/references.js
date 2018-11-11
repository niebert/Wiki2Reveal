function handle_references(pwiki) {
    if (pwiki) {
      // (1) References without a citaion label
      pwiki = pwiki.replace(/ ?<ref>([\s\S]{0,1000}?)<\/ref> ?/gi,"");
      // (2) Cite a reference by a label WITHOUT reference
      // replace <ref name="my book label"/> by "___CITE_7238234792_my_book_label___"
      pwiki = pwiki.replace(/ ?<ref[\s]+name=["']([^"'])["'][^>]{0,200}?\/> ?/gi,"");
      // (3) Reference with citation label that is used multiple time in a document by (2)
      pwiki = pwiki.replace(/ ?<ref [\s]+name=["']([^"'])["'][^>]{0,200}?>([\s\S]{0,1000}?)<\/ref> ?/gi,"");
    } else {
      pwiki = "";
    }
    return pwiki
}
