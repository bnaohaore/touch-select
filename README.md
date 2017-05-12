# touch-select
html<br>
···html
      <input id="select_touch_start" disabled="disabled">
      <div id="touch_select_box"></div>

<br>

js<br>
省市区示例
···javascript
     import touch_select from 'touch-select'
     
    var ct=touch_select.city_data.data; //这是插件内置的省市区数据 data.js 修改 或者自行调用接口获取
    touch_select.set_init({
      render:function (){
        //content节点
        var dat={
          privce:'',
          city:'',
          arr:''
        };

        for(var uy in ct.province){
          dat.privce+='<li  data-name='+ct.province[uy]+'  data-value='+uy+'>'+ct.province[uy]+'</li>';
        }
        for(var uyx in ct.city[3]){
          dat.city+='<li  data-name='+ct.city[3][uyx].area_name+' data-value='+ct.city[3][uyx].area_id+' data-value='+ct.city[3][uyx].area_name+'>'+ct.city[3][uyx].area_name+'</li>';
        }
        for(var uyxx in ct.city[41]){
          dat.arr+='<li  data-child='+ct.city[41][uyxx].area_name+' data-value='+ct.city[41][uyxx].area_id+' data-value='+ct.city[41][uyxx].area_name+'>'+ct.city[41][uyxx].area_name+'</li>';
        }

        touch_select('.ul_out')[0].innerHTML='<ul id="province_t" class="touch-select-ul">'+dat.privce+'</ul><ul id="city_t" class="touch-select-ul">'+dat.city+'</ul><ul id="area_t" class="touch-select-ul">'+dat.arr+'</ul>';

        //插入头部节点
        var heads=document.createElement('div');
        heads.innerHTML='<div class="select_heads_title"><div>省</div><div>市</div><div>区</div></div>';
        touch_select('#touch_select_set_self')[0].insertBefore(heads,touch_select('#touch-select')[0]);


        //插入底部按钮节点
        var footers=document.createElement('div');
        footers.innerHTML='<div class="select_footers"><div>确认</div><div>取消</div></div>';
        touch_select('#touch_select_set_self')[0].appendChild(footers)
      },
      touch_end_fn:function () {
        //设置联动渲染节点
        var dat={
          city:'',
          arr:''
        };

        var value=this.getAttribute('data-value');
        if(this.id=='province_t'){
          for(var ts in ct.city[value]){
            dat.city+='<li  data-name='+ct.city[value][ts].area_name+' data-value='+ct.city[value][ts].area_id+' data-value='+ct.city[value][ts].area_name+'>'+ct.city[value][ts].area_name+'</li>';
          }
          touch_select.set_city(dat.city);
        }
        if(this.id=='city_t'){
          for(var ts in ct.city[value]){
            dat.arr+='<li  data-name='+ct.city[value][ts].area_name+' data-value='+ct.city[value][ts].area_id+' data-value='+ct.city[value][ts].area_name+'>'+ct.city[value][ts].area_name+'</li>';
          }
          touch_select.set_arr(dat.arr);
        }

        //打印选择的value
        console.log(this.getAttribute('data-value'));
        console.log(this.getAttribute('data-name'))
      }
    });
     
     


<br><br><br>
时间示例
js<br>
···javascript
   import touch_select from 'touch-select'
     
    var ct=touch_select.city_data.data;
    touch_select.set_init({
      render:function (){
        //content节点
        var dat={
         year:'',
         month:'',
         day:''
         };
         for(var ww=0;ww<100 ;ww++){
         var zda=2017-ww;
         dat.year+='<li data-name="year" data-value='+zda+'>'+zda+'年</li>'
         }
         for(var wwss=0;wwss<12 ;wwss++){
         var zdb=1+wwss;
         dat.month+='<li data-name="month" data-value='+zdb+'>'+zdb+'月</li>'
         }
         for(var wws=0;wws<31 ;wws++){
         var zdc=1+wws;
         dat.day+='<li data-name="day" data-value='+zdc+'>'+zdc+'日</li>'
         }
         touch_select('.ul_out')[0].innerHTML='<ul class="touch-select-ul">'+dat.year+'</ul><ul class="touch-select-ul">'+dat.month+'</ul><ul class="touch-select-ul">'+dat.day+'</ul>';
        //插入头部节点
        var heads=document.createElement('div');
        heads.innerHTML='<div class="select_heads_title"><div>年</div><div>月</div><div>日</div></div>';
        touch_select('#touch_select_set_self')[0].insertBefore(heads,touch_select('#touch-select')[0]);


        //插入底部按钮节点
        var footers=document.createElement('div');
        footers.innerHTML='<div class="select_footers"><div>确认</div><div>取消</div></div>';
        touch_select('#touch_select_set_self')[0].appendChild(footers)
      },
      touch_end_fn:function () {
        //打印选择的value
       var content={
          value:this.getAttribute('data-value') ,
          name:this.getAttribute('data-name')
      };
      console.log(content)
      }
      }
    });
     
     


