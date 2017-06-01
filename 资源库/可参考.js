var adjustPosition = function(){
                //1.��ȡ��������ڸ߶�
                var pageHeight = window.innerHeight;

                if (typeof pageHeight != "number") {
                    if (document.compatMode == "CSS1Compat") {
                        pageHeight = document.documentElement.clientHeight;
                    } else {
                        pageHeight = document.body.clientHeight;
                    }
                }

                //2.��ȡԪ�ؾ�����������ڵľ���
                var $ele = summary,
                    iHeight = $ele.width(),
                    eEle = $('.J-flag').length > 0 ? $('.J-flag')[0] : null,
                    iRectBrowserTop = eEle && eEle.getBoundingClientRect().top;

                //����ڷ�Χ�⣬��ͣ���ٽ��
                //����ҳ���С��ֻҪ�����ٽ���������������������
                var iMaxTop = (iHeight - pageHeight) >= 0 ? 0 : pageHeight - iHeight;
                var iMinTop = (iHeight - pageHeight) < 0 ? iHeight - pageHeight : 0;

                if(iRectBrowserTop <= iMinTop || iRectBrowserTop >= iMaxTop){
                    var iTop = (iRectBrowserTop <= iMinTop) ? iMinTop : iMaxTop;
                    $ele.css({
                        position: 'fixed',
                        top: iTop,
                        left: '50%',
                        marginLeft: 310
                    });
                }else{
                    $ele.css({
                        position: 'relative',
                        left: 0,
                        marginLeft: 0,
                        top:''
                    });
                }
            };

            win.scroll(adjustPosition);
