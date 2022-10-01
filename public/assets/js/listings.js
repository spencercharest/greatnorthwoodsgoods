/**
 *
 * Auction Nudge
 * https://www.auctionnudge.com
 *
 * By Joe Hawes
 * http://www.morehawes.co.uk
 *
 */

 function AN_Item_JS(){var AN=null;var head=null;var request_endpoint=null;var request_params={};var container=null;var last_js=null;var max_pages=null;this.init=function(params={}){AN=this;AN.config={target_div_id:'auction-nudge-items',request_params:{},template_html:'',item_html:'',page_active:false,page_show_next:false,page_show_prev:false,cats_output:false,search_box:false,theme_css_asset:'',theme_js_asset:''};AN.update_config(params);AN.head=document.getElementsByTagName('head')[0];AN.request_endpoint='https://www.auctionnudge.com/feed/item/js';AN.listen(window,'load',AN.ready);}
 this.update_config=function(params={}){for(i in params){if(typeof AN.config[i]!=='undefined'){AN.config[i]=params[i];}}}
 this.ready=function(){AN.container=document.getElementById(AN.config.target_div_id);if(AN.container===null){AN.console_error('Container #'+AN.config.target_div_id+' not found.');return false;}
 if(AN.config.request_params.theme!=='unstyled'){if(AN.container.className.indexOf('auction-nudge-items')===-1){AN.container.className+=' '+'auction-nudge-items';}
 AN.container.className+=' theme-'+AN.config.request_params.theme;}
 AN.add_template_html(AN.config.template_html);AN.add_item_html(AN.config.item_html);if(AN.config.page_active){AN.setup_pagination();AN.page_links('next',AN.config.page_show_next);}
 if(AN.config.cats_output){AN.setup_cats(AN.config.cats_output);}
 if(AN.config.search_box){AN.setup_search();}
 if(AN.config.theme_css_asset){AN.add_asset('css',AN.config.theme_css_asset);}
 if(AN.config.theme_js_asset){AN.add_asset('js',AN.config.theme_js_asset);}
 AN.ready_callback();}
 this.update=function(params={}){AN.update_config(params);AN.show_loading(false);if(AN.config.item_html){AN.add_item_html(AN.config.item_html);}else{AN.handle_items_end();}
 AN.update_callback(AN.config.page_show_prev,AN.config.page_show_next);}
 this.console_error=function(text=''){console.log('Auction Nudge Error: '+text+'');}
 this.add_template_html=function(html){if(location.host.indexOf('ebay')!=-1||location.host.indexOf('paypal')!=-1){html='<p><strong>Auction Nudge Error</strong><br />Your items can not load because the website hostname contains a disallowed keyword.</p>';}
 AN.container.innerHTML=html;AN.item_wrap=AN.container.getElementsByClassName('an-item-wrap')[0];}
 this.add_item_html=function(html){AN.item_wrap.innerHTML=html;}
 this.create_element=function(type,attr,content){var ele=document.createElement(type);for(key in attr){ele.setAttribute(key,attr[key]);}
 if(content){if(typeof content=='object'){ele.appendChild(content);}else{ele.innerHTML=content;}}
 return ele;}
 this.listen=function(ele,event,callback){if(typeof ele!=='object'){AN.console_error('Element not found');return false;}
 switch(event){case'load':if(typeof ele.addEventListener!="undefined"){ele.addEventListener("load",callback,false);}else if(typeof ele.attachEvent!="undefined"){ele.attachEvent("onload",callback);}else{if(ele.onload!=null){var old_onload=ele.onload;ele.onload=function(e){old_onload(e);e[callback]();};}else{ele.onload=callback;}}
 break;default:if(typeof ele.addEventListener!="undefined"){ele.addEventListener(event,callback,false);}else if(typeof ele.attachEvent!="undefined"){ele.attachEvent('on'+event,callback);}
 break;}}
 this.add_asset=function(type,url){var e_type='';switch(type){case'css':e_type='link';var styles=AN.head.getElementsByTagName(e_type);for(i=0;i<styles.length;i++){if(url===styles[i].href){return false;}}
 var attr={'type':'text/css','rel':'stylesheet','href':url};break;case'js':e_type='script';var scripts=AN.head.getElementsByTagName(e_type);for(i=0;i<scripts.length;i++){if(url===scripts[i].src){return false;}}
 var attr={'type':'text/javascript','src':url};break;}
 AN.head.appendChild(AN.create_element(e_type,attr,''));}
 this.request_items=function(){AN.show_loading(true);var request=AN.build_request();AN.perform_request(request);}
 this.build_request=function(){AN.config.request_params.action='update';var request=AN.request_endpoint;for(key in AN.config.request_params){request+='/'+key+'/'+AN.config.request_params[key];}
 return request;}
 this.perform_request=function(request){if(AN.last_js){AN.head.removeChild(AN.last_js);}
 var attr={'type':'text/javascript','src':request};var add_js=AN.create_element('script',attr,'');AN.head.appendChild(add_js);AN.last_js=add_js;}
 this.ready_callback=function(){if(typeof window.auction_nudge_loaded=='function'){auction_nudge_loaded();}}
 this.update_callback=function(page_show_prev,page_show_next){if(typeof AN.update_pagination=='function'){AN.update_pagination(page_show_prev,page_show_next);}
 if(typeof window.an_item_resize=='function'){an_item_resize();}
 if(typeof window.auction_nudge_loaded=='function'){auction_nudge_loaded();}}
 this.show_loading=function(loading){if(loading){AN.container.className+=' an-loading';}else{AN.container.className=AN.container.className.replace(/( )?an-loading/g,'');}}
 this.setup_pagination=function(){AN.container.className+=' an-paged';AN.page_top=AN.container.getElementsByClassName('an-page-top')[0];AN.page_top_prev=AN.container.getElementsByClassName('an-page-top-prev')[0];AN.page_top_next=AN.container.getElementsByClassName('an-page-top-next')[0];AN.page_bot=AN.container.getElementsByClassName('an-page-bot')[0];AN.page_bot_prev=AN.container.getElementsByClassName('an-page-bot-prev')[0];AN.page_bot_next=AN.container.getElementsByClassName('an-page-bot-next')[0];var l=[AN.page_top_prev,AN.page_top_next,AN.page_bot_prev,AN.page_bot_next];for(i in l){AN.listen(l[i],'click',function(ele){var ele=ele||window.event;var tar=ele.target||ele.srcElement;if(tar.className.indexOf('an-inactive')==-1){if(tar.className.indexOf('prev')!=-1){AN.handle_page_click('prev');}else{AN.handle_page_click('next');}}});}}
 this.page_links=function(type,active){if(typeof AN.page_top==='undefined'){return false;}
 if(type=='prev'){var page_top_link=AN.page_top_prev;var page_bot_link=AN.page_bot_prev;}else if(type=='next'){var page_top_link=AN.page_top_next;var page_bot_link=AN.page_bot_next;}
 page_top_link.className=page_top_link.className.replace(/( )?an-inactive/g,'');page_bot_link.className=page_bot_link.className.replace(/( )?an-inactive/g,'');if(!active){page_top_link.className+=' an-inactive';page_bot_link.className+=' an-inactive';}}
 this.handle_page_click=function(a){var curr_page=parseInt(AN.config.request_params.page);switch(a){case'prev':var to_page=curr_page-1;if(curr_page>1){AN.config.request_params.page=curr_page-1;}else{return;}
 break;case'next':AN.config.request_params.page=curr_page+1;break;}
 if(window.location.hash!='#'+AN.config.target_div_id||window.location.hash==''){window.location.hash='#'+AN.config.target_div_id;}else{window.location.hash='';window.location.hash='#'+AN.config.target_div_id;}
 AN.request_items();}
 this.handle_items_end=function(){AN.config.request_params.page-=1;AN.max_pages=AN.config.request_params.page;}
 this.update_pagination=function(prev,next){AN.page_links('prev',prev);AN.page_links('next',next);if(AN.max_pages==AN.config.request_params.page){AN.page_links('next',false);}}
 this.setup_cats=function(type){AN.container.className+=' an-cats';AN.cats_nav=AN.container.getElementsByClassName('an-cats-nav')[0];if(!AN.cats_nav){return false;}
 switch(type){case'dropdown':var cats=AN.cats_nav.getElementsByTagName('option');for(i=0;i<cats.length;i++){if(cats[i].selected){AN.cat_selected=cats[i];cats[0].innerHTML='All Categories';}}
 AN.listen(AN.cats_nav,'change',function(e){var ele=e||window.event;var tar=ele.target||ele.srcElement;if(AN.hasOwnProperty('cat_selected')){AN.cat_selected.removeAttribute('selected');}
 if(tar.options[0].innerHTML.indexOf('All')==-1){tar.options[0].innerHTML='All Categories';}
 AN.cat_selected=tar.options[tar.selectedIndex];AN.cat_selected.setAttribute('selected','selected');AN.handle_cats_click(AN.cat_selected.getAttribute('data-cat_id'));});break;case'unstyled':var cats=AN.cats_nav.getElementsByTagName('a');for(i=0;i<cats.length;i++){if(cats[i].className.indexOf('an-cat-selected')!=-1){AN.cat_selected=cats[i];}
 AN.listen(cats[i],'click',function(e){var ele=e||window.event;var tar=ele.target||ele.srcElement;if(AN.hasOwnProperty('cat_selected')){AN.cat_selected.className=AN.cat_selected.className.replace(/( )?an-cat-selected/g,'');}
 AN.cat_selected=tar;AN.cat_selected.className+=' an-cat-selected';AN.handle_cats_click(AN.cat_selected.getAttribute('data-cat_id'));});}
 break;}}
 this.handle_cats_click=function(id){AN.config.request_params.categoryId=id;AN.config.request_params.page=1;delete AN.max_pages;AN.request_items();}
 this.encode_str=function(str){return encodeURIComponent(str).replace(/[!'()*]/g,function(c){return'%'+c.charCodeAt(0).toString(16);});}
 this.setup_search=function(type){AN.container.className+=' an-search';AN.search_box=AN.container.getElementsByClassName('an-search-box')[0];AN.search_submit=AN.container.getElementsByClassName('an-search-submit')[0];if(!AN.search_box||!AN.search_submit){return false;}
 AN.search_box.setAttribute('contentEditable','true');AN.listen(AN.search_box,'focus',function(e){if(AN.search_box.innerHTML=='Search items...'){AN.search_box.innerHTML='';}});AN.listen(AN.search_box,'keypress',function(e){if(e.keyCode==13){AN.handle_search_submit(AN.search_box.innerHTML);e.preventDefault()}});AN.listen(AN.search_submit,'click',function(e){AN.handle_search_submit(AN.search_box.innerHTML);});}
 this.handle_search_submit=function(keyword){if(keyword!=''){keyword=keyword.replace(/<(.|\n)*?>/g,'');AN.config.request_params.keyword=AN.encode_str(keyword);}else{delete AN.config.request_params.keyword;}
 AN.config.request_params.page=1;delete AN.max_pages;AN.request_items();}}
 var AN_Item_items=new AN_Item_JS();AN_Item_items.init({target_div_id:'auction-nudge-items',request_params:{"target":"items","action":"init","theme":"responsive","page":"1","img_size":"120","cats_output":"dropdown","search_box":"1","show_logo":"1","lang":"english","SellerID":"cindedward-4","siteid":"0","MaxEntries":"6"},template_html:'<a href=\"https://www.auctionnudge.com/to_ebay/home/site_id/0/user_id/36051/tool_name/item\" rel=\"nofollow\"><img src=\"https://assets-auctionnudge.s3.amazonaws.com/feed/item/img/rnoe-166x96.png\" class=\"an-ebay-logo\" width=\"83\" height=\"48\" id=\"an-ebay-logo\" /></a><div id=\"an-controls-top\" class=\"an-controls-top\"><div id=\"an-cats-wrap\" class=\"an-cats-wrap an-cats-dropdown\"><select id=\"an-cats-nav\" class=\"an-cats-nav\"><option data-cat_id=\"0\">Filter by category:</option><option data-cat_id=\"11450\" class=\"an-cats-cat an-cat-11450\">Clothing, Shoes & Accessories</a><option data-cat_id=\"260010\" class=\"an-cats-cat an-cats-child an-cat-260010\">- Women</a><option data-cat_id=\"260012\" class=\"an-cats-cat an-cats-child an-cat-260012\">- Men</a><option data-cat_id=\"260033\" class=\"an-cats-cat an-cats-child an-cat-260033\">- Specialty</a><option data-cat_id=\"171146\" class=\"an-cats-cat an-cats-child an-cat-171146\">- Kids</a><option data-cat_id=\"1\" class=\"an-cats-cat an-cat-1\">Collectibles</a><option data-cat_id=\"1404\" class=\"an-cats-cat an-cats-child an-cat-1404\">- Lamps, Lighting</a><option data-cat_id=\"13777\" class=\"an-cats-cat an-cats-child an-cat-13777\">- Decorative Collectibles</a><option data-cat_id=\"13905\" class=\"an-cats-cat an-cats-child an-cat-13905\">- Kitchen & Home</a><option data-cat_id=\"29832\" class=\"an-cats-cat an-cats-child an-cat-29832\">- Radio, Phonograph, TV, Phone</a><option data-cat_id=\"966\" class=\"an-cats-cat an-cats-child an-cat-966\">- Pens & Writing Instruments</a><option data-cat_id=\"562\" class=\"an-cats-cat an-cats-child an-cat-562\">- Breweriana, Beer</a><option data-cat_id=\"113\" class=\"an-cats-cat an-cats-child an-cat-113\">- Sewing (1930-Now)</a><option data-cat_id=\"34\" class=\"an-cats-cat an-cats-child an-cat-34\">- Advertising</a><option data-cat_id=\"263076\" class=\"an-cats-cat an-cats-child an-cat-263076\">- Collectible Figures & Supplies</a><option data-cat_id=\"69851\" class=\"an-cats-cat an-cats-child an-cat-69851\">- Vintage, Retro, Mid-Century</a><option data-cat_id=\"29797\" class=\"an-cats-cat an-cats-child an-cat-29797\">- Bottles & Insulators</a><option data-cat_id=\"13956\" class=\"an-cats-cat an-cats-child an-cat-13956\">- Militaria</a><option data-cat_id=\"13849\" class=\"an-cats-cat an-cats-child an-cat-13849\">- Tools, Hardware & Locks</a><option data-cat_id=\"3913\" class=\"an-cats-cat an-cats-child an-cat-3913\">- Cultures & Ethnicities</a><option data-cat_id=\"417\" class=\"an-cats-cat an-cats-child an-cat-417\">- Transportation</a><option data-cat_id=\"259135\" class=\"an-cats-cat an-cats-child an-cat-259135\">- Historical Memorabilia</a><option data-cat_id=\"13658\" class=\"an-cats-cat an-cats-child an-cat-13658\">- Animation Art & Merchandise</a><option data-cat_id=\"1446\" class=\"an-cats-cat an-cats-child an-cat-1446\">- Religion & Spirituality</a><option data-cat_id=\"907\" class=\"an-cats-cat an-cats-child an-cat-907\">- Holiday & Seasonal</a><option data-cat_id=\"137\" class=\"an-cats-cat an-cats-child an-cat-137\">- Disneyana</a><option data-cat_id=\"124\" class=\"an-cats-cat an-cats-child an-cat-124\">- Paper</a><option data-cat_id=\"237\" class=\"an-cats-cat an-cat-237\">Dolls & Bears</a><option data-cat_id=\"238\" class=\"an-cats-cat an-cats-child an-cat-238\">- Dolls, Clothing & Accessories</a><option data-cat_id=\"888\" class=\"an-cats-cat an-cat-888\">Sporting Goods</a><option data-cat_id=\"36259\" class=\"an-cats-cat an-cats-child an-cat-36259\">- Winter Sports</a><option data-cat_id=\"159136\" class=\"an-cats-cat an-cats-child an-cat-159136\">- Water Sports</a><option data-cat_id=\"159043\" class=\"an-cats-cat an-cats-child an-cat-159043\">- Outdoor Sports</a><option data-cat_id=\"16034\" class=\"an-cats-cat an-cats-child an-cat-16034\">- Camping & Hiking</a><option data-cat_id=\"7294\" class=\"an-cats-cat an-cats-child an-cat-7294\">- Cycling</a><option data-cat_id=\"15273\" class=\"an-cats-cat an-cats-child an-cat-15273\">- Fitness, Running & Yoga</a><option data-cat_id=\"159134\" class=\"an-cats-cat an-cats-child an-cat-159134\">- Tennis & Racquet Sports</a><option data-cat_id=\"159049\" class=\"an-cats-cat an-cats-child an-cat-159049\">- Team Sports</a><option data-cat_id=\"36274\" class=\"an-cats-cat an-cats-child an-cat-36274\">- Indoor Games</a><option data-cat_id=\"870\" class=\"an-cats-cat an-cat-870\">Pottery & Glass</a><option data-cat_id=\"262364\" class=\"an-cats-cat an-cats-child an-cat-262364\">- Decorative Cookware, Dinnerware & Serveware</a><option data-cat_id=\"262359\" class=\"an-cats-cat an-cats-child an-cat-262359\">- Drinkware & Barware</a><option data-cat_id=\"262384\" class=\"an-cats-cat an-cats-child an-cat-262384\">- Decorative Pottery & Glassware</a><option data-cat_id=\"220\" class=\"an-cats-cat an-cat-220\">Toys & Hobbies</a><option data-cat_id=\"246\" class=\"an-cats-cat an-cats-child an-cat-246\">- Action Figures & Accessories</a><option data-cat_id=\"180250\" class=\"an-cats-cat an-cats-child an-cat-180250\">- Model Railroads & Trains</a><option data-cat_id=\"19169\" class=\"an-cats-cat an-cats-child an-cat-19169\">- Preschool Toys & Pretend Play</a><option data-cat_id=\"233\" class=\"an-cats-cat an-cats-child an-cat-233\">- Games</a><option data-cat_id=\"183446\" class=\"an-cats-cat an-cats-child an-cat-183446\">- Building Toys</a><option data-cat_id=\"1188\" class=\"an-cats-cat an-cats-child an-cat-1188\">- Models & Kits</a><option data-cat_id=\"19016\" class=\"an-cats-cat an-cats-child an-cat-19016\">- Classic Toys</a><option data-cat_id=\"11731\" class=\"an-cats-cat an-cats-child an-cat-11731\">- Educational</a><option data-cat_id=\"222\" class=\"an-cats-cat an-cats-child an-cat-222\">- Diecast & Toy Vehicles</a><option data-cat_id=\"11700\" class=\"an-cats-cat an-cat-11700\">Home & Garden</a><option data-cat_id=\"20625\" class=\"an-cats-cat an-cats-child an-cat-20625\">- Kitchen, Dining & Bar</a><option data-cat_id=\"20697\" class=\"an-cats-cat an-cats-child an-cat-20697\">- Lamps, Lighting & Ceiling Fans</a><option data-cat_id=\"159912\" class=\"an-cats-cat an-cats-child an-cat-159912\">- Yard, Garden & Outdoor Living</a><option data-cat_id=\"159907\" class=\"an-cats-cat an-cats-child an-cat-159907\">- Home Improvement</a><option data-cat_id=\"262975\" class=\"an-cats-cat an-cats-child an-cat-262975\">- Candles & Home Fragrance</a><option data-cat_id=\"11827\" class=\"an-cats-cat an-cats-child an-cat-11827\">- Wedding Supplies</a><option data-cat_id=\"10033\" class=\"an-cats-cat an-cats-child an-cat-10033\">- Home Décor</a><option data-cat_id=\"631\" class=\"an-cats-cat an-cats-child an-cat-631\">- Tools & Workshop Equipment</a><option data-cat_id=\"299\" class=\"an-cats-cat an-cats-child an-cat-299\">- Household Supplies & Cleaning</a><option data-cat_id=\"293\" class=\"an-cats-cat an-cat-293\">Consumer Electronics</a><option data-cat_id=\"183077\" class=\"an-cats-cat an-cats-child an-cat-183077\">- Vintage Electronics</a><option data-cat_id=\"32852\" class=\"an-cats-cat an-cats-child an-cat-32852\">- TV, Video & Home Audio</a><option data-cat_id=\"3270\" class=\"an-cats-cat an-cats-child an-cat-3270\">- Vehicle Electronics & GPS</a><option data-cat_id=\"20081\" class=\"an-cats-cat an-cat-20081\">Antiques</a><option data-cat_id=\"20091\" class=\"an-cats-cat an-cats-child an-cat-20091\">- Furniture</a><option data-cat_id=\"4707\" class=\"an-cats-cat an-cats-child an-cat-4707\">- Architectural & Garden</a><option data-cat_id=\"1217\" class=\"an-cats-cat an-cats-child an-cat-1217\">- Primitives</a><option data-cat_id=\"156323\" class=\"an-cats-cat an-cats-child an-cat-156323\">- Sewing (Pre-1930)</a><option data-cat_id=\"37978\" class=\"an-cats-cat an-cats-child an-cat-37978\">- Rugs & Carpets</a><option data-cat_id=\"20082\" class=\"an-cats-cat an-cats-child an-cat-20082\">- Asian Antiques</a><option data-cat_id=\"12\" class=\"an-cats-cat an-cats-child an-cat-12\">- Other Antiques</a><option data-cat_id=\"6000\" class=\"an-cats-cat an-cat-6000\">eBay Motors</a><option data-cat_id=\"6028\" class=\"an-cats-cat an-cats-child an-cat-6028\">- Parts & Accessories</a><option data-cat_id=\"34998\" class=\"an-cats-cat an-cats-child an-cat-34998\">- Automotive Tools & Supplies</a><option data-cat_id=\"12576\" class=\"an-cats-cat an-cat-12576\">Business & Industrial</a><option data-cat_id=\"181939\" class=\"an-cats-cat an-cats-child an-cat-181939\">- Test, Measurement & Inspection</a><option data-cat_id=\"11804\" class=\"an-cats-cat an-cats-child an-cat-11804\">- CNC, Metalworking & Manufacturing</a><option data-cat_id=\"61573\" class=\"an-cats-cat an-cats-child an-cat-61573\">- Light Equipment & Tools</a><option data-cat_id=\"11815\" class=\"an-cats-cat an-cats-child an-cat-11815\">- Healthcare, Lab & Dental</a><option data-cat_id=\"1249\" class=\"an-cats-cat an-cat-1249\">Video Games & Consoles</a><option data-cat_id=\"54968\" class=\"an-cats-cat an-cats-child an-cat-54968\">- Video Game Accessories</a><option data-cat_id=\"139971\" class=\"an-cats-cat an-cats-child an-cat-139971\">- Video Game Consoles</a><option data-cat_id=\"11233\" class=\"an-cats-cat an-cat-11233\">Music</a><option data-cat_id=\"176985\" class=\"an-cats-cat an-cats-child an-cat-176985\">- Vinyl Records</a><option data-cat_id=\"625\" class=\"an-cats-cat an-cat-625\">Cameras & Photo</a><option data-cat_id=\"78997\" class=\"an-cats-cat an-cats-child an-cat-78997\">- Lenses & Filters</a><option data-cat_id=\"3326\" class=\"an-cats-cat an-cats-child an-cat-3326\">- Vintage Movie & Photography</a><option data-cat_id=\"619\" class=\"an-cats-cat an-cat-619\">Musical Instruments & Gear</a><option data-cat_id=\"180014\" class=\"an-cats-cat an-cats-child an-cat-180014\">- Pro Audio Equipment</a><option data-cat_id=\"180010\" class=\"an-cats-cat an-cats-child an-cat-180010\">- Pianos, Keyboards & Organs</a><option data-cat_id=\"267\" class=\"an-cats-cat an-cat-267\">Books & Magazines</a><option data-cat_id=\"261186\" class=\"an-cats-cat an-cats-child an-cat-261186\">- Books</a><option data-cat_id=\"29792\" class=\"an-cats-cat an-cats-child an-cat-29792\">- Audiobooks</a><option data-cat_id=\"29223\" class=\"an-cats-cat an-cats-child an-cat-29223\">- Antiquarian & Collectible</a><option data-cat_id=\"2984\" class=\"an-cats-cat an-cat-2984\">Baby</a><option data-cat_id=\"100982\" class=\"an-cats-cat an-cats-child an-cat-100982\">- Carriers, Slings & Backpacks</a><option data-cat_id=\"20400\" class=\"an-cats-cat an-cats-child an-cat-20400\">- Feeding</a><option data-cat_id=\"58058\" class=\"an-cats-cat an-cat-58058\">Computers/Tablets & Networking</a><option data-cat_id=\"31530\" class=\"an-cats-cat an-cats-child an-cat-31530\">- Laptop & Desktop Accessories</a><option data-cat_id=\"11116\" class=\"an-cats-cat an-cat-11116\">Coins & Paper Money</a><option data-cat_id=\"253\" class=\"an-cats-cat an-cats-child an-cat-253\">- Coins: US</a><option data-cat_id=\"550\" class=\"an-cats-cat an-cat-550\">Art</a><option data-cat_id=\"551\" class=\"an-cats-cat an-cats-child an-cat-551\">- Paintings</a></select></div><div id=\"an-search-wrap\" class=\"an-search-wrap\"><div id=\"an-search-box\" class=\"an-search-box\">Search items...</div><div id=\"an-search-submit\" class=\"an-search-submit\">Search</div></div></div><ul id=\"an-page-top\" class=\"an-page-top an-page-wrap\"><li id=\"an-page-top-prev\" class=\"an-page-top-prev an-page-prev an-inactive\">« Previous</li><li id=\"an-page-top-next\" class=\"an-page-top-next an-page-next\">Next »</li></ul><div id=\"an-item-wrap\" class=\"an-item-wrap\"></div><ul id=\"an-page-bot\" class=\"an-page-bot an-page-wrap\"><li id=\"an-page-bot-prev\" class=\"an-page-bot-prev an-page-prev an-inactive\">« Previous</li><li id=\"an-page-bot-next\" class=\"an-page-bot-next an-page-next\">Next »</li></ul><div><a href=\"https://www.auctionnudge.com/tools/your-ebay-items\" style=\"display:block;font-size:11px;color:#808080;text-decoration:none;font-family:Helvetica,Arial,sans-serif;text-align:center\">eBay Listings from <span style=\"color:#4374b7\">Auction Nudge</span></a></div>',item_html:'<div class=\"an-item\"><div class=\"an-title\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bo93bhlcd\" rel=\"nofollow\">Shimano RP300 Road Cycle Bike SPD-SL Cycling Shoes Dynalast Size EU 47 US 11.8</a></div><div class=\"an-wrap\"><div class=\"an-image an-img-size\" style=\"width:120px;height:120px;overflow:hidden\"><div class=\"image-container\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bo93bhlcd\" rel=\"nofollow\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><img src=\"https://i.ebayimg.com/thumbs/images/g/IyUAAOSwKYZjEOqn/s-l140.jpg\" /></a></div></div><div class=\"an-price\"><span class=\"an-amount\">&#36;39.95</span></div><div class=\"an-ends\"><span class=\"an-label\">Time Left:</span><span class=\"an-time\">0d 2h 3m</span></div><div class=\"an-view\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bo93bhlcd\" rel=\"nofollow\">Buy It Now&raquo;</a></div></div></div><div class=\"an-item alt\"><div class=\"an-title\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bo93b6bfo\" rel=\"nofollow\">LL Bean Mens L Reg  DownTek Mountain Classic Down Parka Puffer Coat Jacket</a></div><div class=\"an-wrap\"><div class=\"an-image an-img-size\" style=\"width:120px;height:120px;overflow:hidden\"><div class=\"image-container\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bo93b6bfo\" rel=\"nofollow\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><img src=\"https://i.ebayimg.com/thumbs/images/g/nLIAAOSwx71jEO4B/s-l140.jpg\" /></a></div></div><div class=\"an-price\"><span class=\"an-amount\">&#36;74.95</span></div><div class=\"an-ends\"><span class=\"an-label\">Time Left:</span><span class=\"an-time\">0d 2h 21m</span></div><div class=\"an-view\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bo93b6bfo\" rel=\"nofollow\">Buy It Now&raquo;</a></div></div></div><div class=\"an-item\"><div class=\"an-title\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bl66odl34\" rel=\"nofollow\">Orgelectra Type A9DWA for Pipe Organ La Marche Mfg. Co.</a></div><div class=\"an-wrap\"><div class=\"an-image an-img-size\" style=\"width:120px;height:120px;overflow:hidden\"><div class=\"image-container\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bl66odl34\" rel=\"nofollow\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><img src=\"https://i.ebayimg.com/thumbs/images/g/0moAAOSwl09gGBxF/s-l140.jpg\" /></a></div></div><div class=\"an-price\"><span class=\"an-amount\">&#36;99.95</span></div><div class=\"an-ends\"><span class=\"an-label\">Time Left:</span><span class=\"an-time\">0d 2h 57m</span></div><div class=\"an-view\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bl66odl34\" rel=\"nofollow\">Buy It Now&raquo;</a></div></div></div><div class=\"an-item alt\"><div class=\"an-title\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3b74e9gd63\" rel=\"nofollow\">MARKER Vtg 80s retro 90\'s Ski Jacket Coat Zipper Womens Size 10 ski snowboard</a></div><div class=\"an-wrap\"><div class=\"an-image an-img-size\" style=\"width:120px;height:120px;overflow:hidden\"><div class=\"image-container\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3b74e9gd63\" rel=\"nofollow\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><img src=\"https://i.ebayimg.com/thumbs/images/g/-ywAAOSwsMNh-YM1/s-l140.jpg\" /></a></div></div><div class=\"an-price\"><span class=\"an-amount\">&#36;79.95</span></div><div class=\"an-ends\"><span class=\"an-label\">Time Left:</span><span class=\"an-time\">0d 3h 40m</span></div><div class=\"an-view\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3b74e9gd63\" rel=\"nofollow\">Buy It Now&raquo;</a></div></div></div><div class=\"an-item\"><div class=\"an-title\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bogc7ce9c\" rel=\"nofollow\">Antique Wooden Sled, Walter Woods Thistle Toboggan Untouched Rare Original Paint</a></div><div class=\"an-wrap\"><div class=\"an-image an-img-size\" style=\"width:120px;height:120px;overflow:hidden\"><div class=\"image-container\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bogc7ce9c\" rel=\"nofollow\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><img src=\"https://i.ebayimg.com/thumbs/images/g/UGAAAOSwV5til8GR/s-l140.jpg\" /></a></div></div><div class=\"an-price\"><span class=\"an-amount\">&#36;189.95</span></div><div class=\"an-ends\"><span class=\"an-label\">Time Left:</span><span class=\"an-time\">0d 4h 27m</span></div><div class=\"an-view\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3bogc7ce9c\" rel=\"nofollow\">Buy It Now&raquo;</a></div></div></div><div class=\"an-item alt\"><div class=\"an-title\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3b74ea44fc\" rel=\"nofollow\">Lot of 6 Name Brand Short Sleeve Polo Golf Shirts Cotton & Summer Comfort Sz L</a></div><div class=\"an-wrap\"><div class=\"an-image an-img-size\" style=\"width:120px;height:120px;overflow:hidden\"><div class=\"image-container\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3b74ea44fc\" rel=\"nofollow\" style=\"width:120px;height:120px;max-width:120px;max-height:120px;\"><img src=\"https://i.ebayimg.com/thumbs/images/g/040AAOSw7eJh-ZIa/s-l140.jpg\" /></a></div></div><div class=\"an-price\"><span class=\"an-amount\">&#36;39.95</span></div><div class=\"an-ends\"><span class=\"an-label\">Time Left:</span><span class=\"an-time\">0d 4h 44m</span></div><div class=\"an-view\"><a href=\"https://www.auctionnudge.com/to_ebay/item/site_id/0/user_id/36051/tool_name/item/item_hash/3b74ea44fc\" rel=\"nofollow\">Buy It Now&raquo;</a></div></div></div>',page_active:true,page_show_next:true,cats_output:'dropdown',search_box:true,theme_css_asset:'https://assets-auctionnudge.s3.amazonaws.com/feed/item/css/responsive.min.css?v=4.5.3',theme_js_asset:'https://assets-auctionnudge.s3.amazonaws.com/feed/item/js/responsive.min.js?v=4.5.3'});