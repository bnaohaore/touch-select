/**
 * Created by hasee on 2017/5/12.
 */
const citys=require('./data.js');
const css=require('./touch-css.css');
function touch_select(xx) {
  return new touch_select.prototype.init(xx)
}

touch_select.__proto__=touch_select.prototype={
  init:function (xx) {

    var moresdom=  document.querySelectorAll(xx);
    for(var ids in moresdom){
      this[ids]=moresdom[ids]
    }
    return this
  },
  city_data:citys,
  set_init:function (ob) {
    var tha=this;
    tha.ob=ob;
    touch_select('body')[0].addEventListener('click',function (event) {
      if(event.target.id=='select_touch_start'){
        if(touch_select('#touch_select_set_self').length<1){
          set_inits()
        }
      }
    });
    function set_inits() {
      var setdom=document.createElement('div');
      setdom.id='select_tc_out';
      touch_select('#touch_select_box')[0].appendChild(setdom);
      touch_select('#select_tc_out')[0].innerHTML=' <div id="touch_select_set_self"><div id="touch-select" ><div class="select_set" > </div> <div style="width: 90%;height: 100%;display: flex;position: relative;z-index:22" class="ul_out"> </div></div></div>';
      tha.ob.render();

      tha.li_height=touch_select('#touch-select li')[0].offsetHeight;
      touch_select('#touch-select')[0].style.height=tha.li_height*5+'px';



      touch_select('body')[0].addEventListener('click',function (event) {
        if(event.target.id=='select_touch_start'){
          touch_select('#select_tc_out')[0].style.opacity='1';
          touch_select('#select_tc_out')[0].style.display='block'
        }
        if(event.target.id=='select_tc_out'){
          touch_select('#select_tc_out')[0].style.opacity='0';
          touch_select('#select_tc_out')[0].style.display='none'
        }
      },false);

      touch_select('#touch-select')[0].addEventListener('touchstart',stat,false);
      function stat(event) {
        event.preventDefault();
        if(event.target.parentNode.className.indexOf('touch-select-ul') !=-1){
          event.target.parentNode.className='touch-select-ul';
          tha.doms_height=event.target.parentNode.childNodes.length*event.target.offsetHeight;
          tha.dom_now_num=event.target.parentNode.style.webkitTransform.replace(/[translateY,px,()]/g,'');

          tha.starty=event.touches[0].clientY;
        }
      };
      touch_select('#touch-select')[0].addEventListener('touchmove',moves,false);
      function moves(event) {
        event.preventDefault();
        if(event.target.parentNode.className.indexOf('touch-select-ul')!=-1){
          var touch_one = event.touches[0];
          this.touch_dom=event.target.parentNode;
          tha.set_transfrom(this.touch_dom,touch_one)
        }
      };
      touch_select('#touch-select')[0].addEventListener('touchend',function (event) {
        event.preventDefault();
        tha.ends(event)
      },false);
    }
  },
  set_transfrom:function (doms,touch_one){
    var tha=this;
    tha.dom_go_num=-((tha.starty-touch_one.clientY)-tha.dom_now_num );
    doms.setAttribute('style','transform:translateY('+tha.dom_go_num+'px)')
  },

  ends:function(event) {
    var tha=this;
    if(event.target.parentNode.className.indexOf('touch-select-ul')!=-1){
      event.target.parentNode.className=event.target.parentNode.className+' trans1';
      tha.this_select_num=(-(tha.dom_go_num-(tha.li_height*2)))/tha.li_height;
      tha.set_num=(-Math.round(tha.this_select_num)*tha.li_height)+(tha.li_height*2);
      if(tha.set_num>tha.li_height*2){
        tha.set_num=tha.li_height*2
      }
      if(tha.set_num<-(tha.doms_height-tha.li_height*3)){
        tha.set_num=-(tha.doms_height-tha.li_height*3)
      }
      event.target.parentNode.setAttribute('style','transform:translateY('+tha.set_num+'px)');

      tha.index_li=-(tha.set_num-(tha.li_height*2))/tha.li_height;

      for(var setdata in event.target.parentNode.childNodes[tha.index_li].dataset){
        event.target.parentNode.setAttribute('data-'+setdata,event.target.parentNode.childNodes[tha.index_li].dataset[setdata]);
      }

      if(typeof tha.ob.touch_end_fn =='function'){
        tha.ob.touch_end_fn.call(event.target.parentNode)
      }
    }
  },
  set_city:function (city) {
    var tha=this;
    touch_select('#city_t')[0].setAttribute('style','transform:translateY('+tha.li_height*2+'px)');
    touch_select('#city_t')[0].innerHTML=city;
    touch_select('#area_t')[0].innerHTML=''
  },set_arr:function(arr){
    var tha=this;
    touch_select('#area_t')[0].setAttribute('style','transform:translateY('+tha.li_height*2+'px)');
    touch_select('#area_t')[0].innerHTML=arr
  }
};

module.exports=touch_select;
