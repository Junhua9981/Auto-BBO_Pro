//path:str pic path
//wait:bool  true:wait for  
function pressButtom(path, wait) {
    let btn = images.read(path);
    p = findImage(captureScreen(), btn, {
        threshold: 0.7
    });
    if (wait) {
        for (let i = 0; !p && i <= 6; i++) {
            if (i === 6) {
                toastLog("腳本關閉")
                exit();
            }
            toastLog("找不到按鈕 第" + i + "次嘗試");
            sleep(2000);
            p = findImage(captureScreen(), btn, {
                threshold: 0.7
            });
            sleep(750);
        }
    }
    sleep(250);
    if(p){
        toastLog("按鈕座標" + p);
        press(p.x + 10, p.y + 35, 350);
    }
    btn.recycle();

    sleep(1000);
}

//主葉面到單人遊戲
function toSinglePlayer() {
    let path = "";

    //遊戲模式
    path = "./gameMode.png";
    pressButtom(path, true);

    //單人模式
    path = "./singlePlayer.png";
    pressButtom(path, true);
}

//兩個投手畫面開始
function startSinglePlayer() {
    let flag=0;
    let path = "";

    //開始遊戲
    path = "./startGame.png";
    pressButtom(path, true);

    //回復投手體力
    path = "./recover.png";
    pressButtom(path, false);
    //FIXME: pic bug 
    //跳過動畫
    path = "./skip.png";
    pressButtom(path, false);
    sleep(10000);
    press(1150, 650, 350);
    sleep(10000);
/*
    //自動遊戲中 933 99 ff252526 
    var flag = images.detectsColor(captureScreen(), "#ff252526", 933, 33); // 或許可以改成 device.width/2 , 1
    while (flag <= 3) {  //bug
        if (!images.detectsColor(captureScreen(), "#ff252526", 933, 33)) {
            flag = flag + 1;
            toastLog("flag=" + flag);
        }
        else {
            flag = 0;
        }

        sleep(2000);
        //toastLog("等賽比完...");
    }
    toastLog("比賽完畢");
*/
    sleep(15000);

    //下一個
    path = "./nxt.png";
    let btn = images.read(path);
    let conf = images.read("./conf.png");
    pic=captureScreen();
    p = findImage(pic, btn, {
        threshold: 0.7
    });
    p2 = findImage(pic, conf, {
        threshold: 0.7
    });
    while((!p)&&(!p2)) {
        toastLog("比賽未結束");
        sleep(10000);
        p = findImage(captureScreen(), btn, {
            threshold: 0.7
        });
        p2 = findImage(captureScreen(), conf, {
        threshold: 0.7
    });
    }
    sleep(250);
    //toastLog("按鈕座標" + p);
    if(p){
        press(p.x + 10, p.y + 35, 350);
        flag=1;
    }
    else if(p2){
        press(p2.x + 10, p2.y + 35, 350);
        flag=2;
        }
    btn.recycle();
    conf.recycle();

    sleep(1000);
    if(flag===1){
        path = "./conf.png";
        pressButtom(path, true);
     
        sleep(2000);
    }
}

//Main 
if (!requestScreenCapture(true)) {
    toast("獲取截圖權限失敗");
    exit();
}
press(device.width/2, device.height/2, 150);
sleep(100);
//toSinglePlayer();
while (true) {
    startSinglePlayer();
}
exit();

