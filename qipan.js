$(function(){
    let qipan = $('.qipan');
    let flag = true;
    let hei = {},
        bai = {},
        blank = {},
        ai = true;
    for(let i =0;i<15;i++){
        $('<i>').appendTo(qipan);
        $('<b>').appendTo(qipan);
        for(let j=0;j<15;j++){
            blank[i+'-'+j]=true;
            $('<div>')
                .appendTo(qipan)
                .addClass('qizi')
                .attr('id',i+'-'+j)
                .data('pos',{x:i,y:j});    //在元素上存放位置数据
        }
    }

    qipan.on('click','.qizi',function(){
        if($(this).hasClass('hei') || $(this).hasClass('bai')){
            return;
        }
        let data = $(this).data('pos');
        if(flag){
            $(this).addClass('hei');
            hei[data.x+'-'+data.y]  = true;
            delete blank[data.x+'-'+data.y];
            if(isSuccess(data,hei) == 5){
                qipan.off();
                return;
            }
            if(ai){
                let pos = position();
                $('#'+pos.x+'-'+pos.y).addClass('bai');
                bai[pos.x+'-'+pos.y]  = true;
                delete blank[pos.x+'-'+pos.y];
                if(isSuccess(pos,bai) == 5){
                    qipan.off()
                }
                return;
            }
        }else{
            $(this).addClass('bai');
            bai[data.x+'-'+data.y]  = true;
            if(isSuccess(data,bai) == 5){
                qipan.off()
            }
        }
        flag = !flag;
    })

    function position(){
        let sco1 =0,sco2 = 0,pos1 = null,pos2 = null;
        for(let i in blank){
            let obj = {x:i.split('-')[0],y:i.split('-')[1]};
            if(isSuccess(obj,hei)>sco1){
                sco1 = isSuccess(obj,hei);
                pos1 = obj;
            }
            if(isSuccess(obj,bai)>sco2){
                sco2 = isSuccess(obj,bai);
                pos2 = obj;
            }
        }
        return sco1>sco2?pos1:pos2;
    }

    function isSuccess(pos,obj){
        let heng = 1,shu = 1,zx = 1,yx = 1,
            x = pos.x, y = pos.y;

        while(obj[x+'-'+(++y)]){
            heng++;
        }
        x = pos.x, y = pos.y;
        while(obj[x+'-'+(--y)]){
            heng++;
        }
        x = pos.x, y = pos.y;
        while(obj[(++x)+'-'+y]){
            shu++;
        }
        x = pos.x, y = pos.y;
        while(obj[(--x)+'-'+y]){
            shu++;
        }
        x = pos.x, y = pos.y;
        while(obj[(++x)+'-'+(++y)]){
            zx++;
        }
        x = pos.x, y = pos.y;
        while(obj[(--x)+'-'+(--y)]){
            zx++;
        }
        x = pos.x, y = pos.y;
        while(obj[(++x)+'-'+(--y)]){
            yx++;
        }
        x = pos.x, y = pos.y;
        while(obj[(--x)+'-'+(++y)]){
            yx++;
        }
        console.log(heng,shu,zx,yx)
        return Math.max(heng,shu,zx,yx)
    }

})