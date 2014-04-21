introReset(false);
$("#pause-icon").hide();

bind("start");
bind("shop");
bind("options");
bind("op_sensitivity");
bind("close_panel2");
bind("close_shop");
bind("op_1stperson");
bind("op_controls");
bind("op_yinvert");
bind("op_difficulty");

bind("music");

bind("classic");
bind("pioneer");
bind("hugo");

bind("brakes");

bdy = document.getElementById("body");


var container, ctx, stats;
var camera, scene, renderer;

var geometry, dust;
var group2, group2color
var ship;
var mouseX = 0,
    mouseY = 0;

var particles = new Array();

var objs, background;

var fov = 80;
var fogdepth = 3500;
var dtm, track, next_frame, phase;
var zcamera = zcamera2 = 0;
var p = new Array();

init();
animate();

function init() {

    sensitivity = get("omsensitivity", 1);
    autoswitch = get("omautoswitch", 0);
    controls = get("omcontrols", 0);
    expert = controls == 2;
    yinvert = get("omyinvert", 0);
    music = get("music", 0);

    gold = get("gold", 0);
    html("gold", gold | 0);

    sail = get("sail", 0);
    html("sail", sail);

    updateShop();

    window.addEventListener('keyup', keyUp, true);
    window.addEventListener('keydown', keyDown, true);
    window.addEventListener('keypress', keyPress, true);
    window.addEventListener('mousemove', onDocumentMouseMove, false);

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, fogdepth);
    camera.position.z = 0;

    scene = new THREE.Scene();

    SC.initialize({
        client_id: 'ab0d4ac1a41f37a6194543220ea2193f'
    });

    // LIGHTS / FOG

    light1 = new THREE.DirectionalLight(0xddddff);
    light1.position.set(2, -3, 1.5);
    light1.position.normalize();
    scene.add(light1);

    light2 = new THREE.DirectionalLight();
    light2.color.setHSV(Math.random(), 0.75, 1);
    light2.position.set(-1.5, 2, 0);
    light2.position.normalize();
    scene.add(light2);

    scene.fog = new THREE.Fog(0x000000, 1, fogdepth);

    // DUST

    dust = new THREE.Geometry();
    for (i = 0; i < 2000; i++) {
        var r = 850 + Math.random() * 2100;
        var a = Math.random() * 2 * Math.PI;
        vector = new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, Math.random() * fogdepth);
        dust.vertices.push(new THREE.Vertex(vector));
    }

    materials = new THREE.ParticleBasicMaterial({
        size: 15,
        opacity: 0.1
    });
    materials.color.setRGB(1, 1, 1);

    particles[0] = new THREE.ParticleSystem(dust, materials);
    particles[0].position.z = 0;
    scene.add(particles[0]);

    particles[1] = new THREE.ParticleSystem(dust, materials);
    particles[1].position.z = -fogdepth;
    scene.add(particles[1]);


    // BACKGROUND

    background = new THREE.Object3D();
    scene.add(background);

    var mesh_tmp = generateCubesRing(300, 0, 1200, 200, 1500, 5);

    mesh_tmp.computeFaceNormals();
    group2color = new THREE.MeshPhongMaterial({
        color: 0xff0000,
        specular: 0xffffff,
        shininess: 150,
        shading: THREE.FlatShading
    });

    group2 = new THREE.Mesh(mesh_tmp, group2color);
    group2color.color.setRGB(1, 1, 0);
    group2.matrixAutoUpdate = true;
    group2.updateMatrix();
    background.add(group2);

    group2.position.z = -fogdepth;
    group2.rotation.x = Math.PI / 2;

    // OBJECTS

    objs = new THREE.Object3D();
    scene.add(objs);

    for (i = 0; i < 200; i++) {
        var obs = generateObstacle();
        obs.position.z = -i * (fogdepth / 200);
        obs.position.x = Math.random() * 5000 - 2500;
        obs.position.y = Math.random() * 3000 - 1500;
        obs.rotation.x = Math.random() * Math.PI;
        obs.rotation.y = Math.random() * Math.PI;
    }

    // SHIP

    if (!$.jStorage.get("ship")) $.jStorage.set("ship", 1);
    ship = generateShip($.jStorage.get("ship"));

    // UPGRADES

    if (owned_items.contains("brakes")) useBrakes();

    // RENDERER
    renderer = new THREE.WebGLRenderer({
        antialias: true
    }); // preserveDrawingBuffer: true

    var canvas = document.getElementById('hud');
    ctx = canvas.getContext('2d');

    renderer.autoClear = true;
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);

    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '-200px';
    stats.domElement.style.zIndex = 100;
    stats.domElement.style.opacity = 0.5;
    container.appendChild(stats.domElement);

    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();

    tm = (new Date).getTime();
    track = 10000;
    next_frame = 0;
    phase = 1;

    updateUI();
    html('music', 'in-game music ' + (music == 0 ? "off" : "on"));

}


//

function animate() {
    requestAnimationFrame(animate);

    var ntm = (new Date).getTime();
    dtm = ntm - tm;
    tm = ntm;

    if (status == 0) {
        render_intro();
    } else {
        render_game();
    }

    stats.update();

}


// 

function render_intro() {

    clight = (tm / 100000) % 1;
    light2.color.setHSV(clight, 0.4, 1);

    zcamera2 = zcamera = -220;
    xratio = 1;
    yratio = 1;

    camera.position = {
        x: shipX * xratio,
        y: shipY * yratio,
        z: zcamera
    };

    group2.position.z += speed;
    group2.rotation.y = -new Date().getTime() * 0.0004;
    if (group2.position.z > 0) {
        group2.position.z = -fogdepth;
        group2color.color.setHSV(Math.random(), 1, 1);
    }

    camera.lookAt(new THREE.Vector3(shipX * 0.5, shipY * 0.25, -1000));

    for (i = 0, l = objs.children.length; i < l; i++) {

        var object = objs.children[i];

        object.rotation.x += 0.01;
        object.rotation.y += 0.005;

        object.position.z += speed;
        if (object.position.z > 100) {
            object.position.z -= fogdepth;
            object.position.x = Math.random() * 3000 - 1500;
            object.position.y = Math.random() * 3000 - 1500;
        }
    }

    renderer.render(scene, camera);
    speed = 0.3;

    fov = 110;

    camera.fov = fov;
    camera.updateProjectionMatrix();

}


//

var rand;

function render_game() {

    if (!paused) {
        if (speed > 0) {
            clight = speed / speedlimit;
            bdy.style.backgroundColor = '#000';
        } else {
            clight = 0;
            tmp = -((Math.random() * speed * 100) | 0);
            bdy.style.backgroundColor = 'rgb(' + tmp + ',' + (tmp / 2) + ',0)';
        }
        light2.color.setHSV(clight, 0.3, 1);

        if (controls == 0) { // mouse
            mx = Math.max(Math.min(mouseX * sen, 1), -1);
            my = Math.max(Math.min(mouseY * sen, 1), -1);
        } else { // keyboard
            if (key_up) my -= 0.002 * dtm * sen;
            if (key_down) my += 0.002 * dtm * sen;
            if (key_left) mx -= 0.003 * dtm * sen;
            if (key_right) mx += 0.003 * dtm * sen;
            mx = Math.max(Math.min(mx, 1), -1);
            my = Math.max(Math.min(my, 1), -1);
        }

        if (yinvert == 1) my = -my;

        shipX = shipX - (shipX - mx * 700) / 4;
        shipY = shipY - (shipY - (-my) * 250) / 4;

        if (autoswitch) {
            if (speed < 15) {
                view = 1;
                zcamera2 = 0;
            } else {
                view = 2;
                zcamera2 = -220;
            }
        }

        if (view == 1) {
            // 3th
            xratio = 1.1;
            yratio = 0.5;
        } else {
            // 1st
            xratio = 1;
            yratio = 1;
        }

        zcamera = zcamera - (zcamera - zcamera2) / 10;

        camera.position = {
            x: shipX * xratio,
            y: shipY * yratio,
            z: zcamera
        };

        ship.position.x = shipX;
        ship.position.y = shipY;
        ship.position.z = -200;

        if (!expert) ship.rotation.z = -shipX / 1000;
        else ship.rotation.z -= +key_turn_right / 10, ship.rotation.z += +key_turn_left / 10;

        if (speed >= 100) {
            ship.material.color.setRGB(1, 0, 1);
            ship.material.color.setRGB(1, 1, 0);
        } else {
            ship.material.color.setRGB(1, 1, 1);
        }

        group2.position.z += speed;
        group2.rotation.y = -new Date().getTime() * 0.0004;
        if (group2.position.z > 0) {
            group2.position.z = -4000;
            group2color.color.setHSV(clight, 1, 1);
        }

        camera.lookAt(new THREE.Vector3(shipX * 0.5, shipY * 0.25, -1000));

        // Dust
        particles[0].position.z += speed;
        if (particles[0].position.z > 100) {
            particles[0].position.z -= fogdepth * 2;
        }
        particles[1].position.z += speed;
        if (particles[1].position.z > 100) {
            particles[1].position.z -= fogdepth * 2;
        }

        for (i = 0, l = objs.children.length; i < l; i++) {

            var object = objs.children[i];

            object.rotation.x += 0.01;
            object.rotation.y += 0.005;

            object.position.z += speed;
            if (object.position.z > 100) {
                object.position.z -= fogdepth;
                next_frame++;

                switch (phase) {
                case 1: // asteroids field
                    if (Math.random() < 0.97) {
                        object.position.x = Math.random() * 3000 - 1500;
                        object.position.y = Math.random() * 3000 - 1500;
                    } else {
                        object.position.x = ship.position.x;
                        object.position.y = ship.position.y;
                    }
                    break;
                case 2:
                    object.position.x = Math.cos(next_frame / p[0]) * p[1] + Math.cos(next_frame / p[2]) * p[3];
                    object.position.y = Math.sin(next_frame / p[4]) * p[5] + Math.sin(next_frame / p[6]) * p[7];
                    break;
                case 3:
                    object.position.x = Math.cos(next_frame / p[0]) * p[1] + Math.cos(next_frame / p[2]) * p[3];
                    object.position.y = Math.sin(next_frame / p[4]) * p[5] + Math.sin(next_frame / p[6]) * p[7];
                    break;
                case 4:
                    var r = Math.cos(next_frame / p[0]) * 2000;
                    object.position.x = Math.cos(next_frame / p[1]) * r;
                    object.position.y = Math.sin(next_frame / p[1]) * r;
                    break;
                case 5:
                    object.position.x = Math.cos(next_frame / p[0]) * p[1] + Math.cos(next_frame / p[2]) * p[3];
                    object.position.y = Math.sin(next_frame / p[4]) * p[5] + Math.sin(next_frame / p[6]) * p[7];
                    break;
                case 6:
                    if (Math.random() < 0.95) {
                        object.position.x = ship.position.x;
                        object.position.y = ship.position.y;
                    } else {
                        object.position.x = Math.random() * 3000 - 1500;
                        object.position.y = Math.random() * 3000 - 1500;
                    }
                    break;
                }

                //choose powerup
                rand = Math.random();
                if (rand < 0.01 && (phase == 1 || phase == 6)) {
                    if (rand < 0.008) {
                        object.name = "gold";
                        object.material.color.setRGB(1, 1, 0);
                    } else {
                        object.name = "life";
                        object.material.color.setRGB(0, 1, 0);
                    }
                }

            }

            health = health == NaN ? 0 : health;
            // Collision check
            if (Math.abs(ship.position.x - object.position.x) < 100 && Math.abs(ship.position.y - object.position.y) < 50 && Math.abs(ship.position.z - object.position.z) < 50) {
                var vis = object.visible;
                switch (object.name) {
                case "gold":
                    if (vis) {
                        gold += 1;
                        object.visible = false;
                        //play some gold sound
                    }
                    break;

                case "life":
                    if (vis) {
                        health += 20;
                        object.visible = false;
                        //play some healing sound
                    }
                    break;

                default:
                    if (speed > 25) {
                        health -= speed / (mode == 1 ? 1.3 : mode == 2 ? 0.8 : 1.3);
                    }
                    speed = -3;
                    break;
                }
            }

        }

        html("gold", gold | 0);

        if (health < 0 && speed > 0) introReset(true);

        renderer.render(scene, camera);

        //var factor = track%100?Math.random()*100:factor;
        speed = speed + (dtm / (mode == 1 ? 300 : mode == 2 ? Math.random() * 100 : 300));
        if (speed > maxspeed) {
            speed = maxspeed;
            maxspeed = Math.min(maxspeed + (dtm / 1500), 100);
        }

        if (speed > 25) {
            score++;
            html("score", score);
        }
        //html("score",Math.floor(speed)+" "+Math.floor(maxspeed)+" "+speedlimit);

        // Dust
        materials.opacity = speed / maxspeed;

        track -= speed;
        if (track < 0) {
            track = 5000 + Math.random() * 5000;
            gold += 0.16;

            phase = (Math.random() * 5) + 1 | 0;
            phase = (phase == 5 ? (Math.random() * 5) + 1 | 0 : phase);

            switch (phase) {
            case 1:
                break;

            case 2: // twirl 1
                p[0] = Math.random() * 3 + 0.01;
                p[1] = 300 + Math.random() * 900;
                p[4] = p[0];
                p[5] = 300 + Math.random() * 900;

                p[2] = 8 + Math.random() * 77; // x secondary
                p[3] = Math.random() * 500; // x secondary
                p[6] = 8 + Math.random() * 77; // y secondary
                p[7] = Math.random() * 400; // y secondary

                break;

            case 3: // snake
                p[0] = Math.random() * 30 + 7;
                p[1] = 300 + Math.random() * 900;
                p[4] = p[0];
                p[5] = 300 + Math.random() * 700;

                p[2] = 8 + Math.random() * 77; // x secondary
                p[3] = 200 + Math.random() * 1000; // x secondary
                p[6] = 8 + Math.random() * 77; // y secondary
                p[7] = 200 + Math.random() * 1000; // y secondary

                break;

            case 4: // plane
                p[0] = Math.random() * 3 + 0.01;
                p[1] = (Math.random() * 500 + 40) * (Math.random() > 0.5 ? 1 : -1);
                break;

            case 5: // twirl 2
                p[0] = Math.random() * 3 + 0.01;
                p[1] = 300 + Math.random() * 500;
                p[4] = p[0];
                p[5] = 300 + Math.random() * 500;

                p[2] = 8 + Math.random() * 77; // x secondary
                p[3] = Math.random() * 900; // x secondary
                p[6] = 8 + Math.random() * 77; // y secondary
                p[7] = Math.random() * 800; // y secondary

                break;
            }

        }

        fov = fov - (fov - (65 + speed / 2)) / 4;

        camera.fov = fov;
        camera.updateProjectionMatrix();

        // engines
        //engine_lt.scale.x=engine_lt.scale.y=engine_rt.scale.x=engine_rt.scale.y = (70/fov)/5 ;
        //var engop = Math.random()/10+0.9
        //engine_lt.opacity=engine_rt.opacity = engop;

        ctx.clearRect(0, 0, 300, 300);
        var sp = speed / speedlimit * Math.PI * 2;
        if (speed > 0) {
            drawSector(50, 50, 50, 0, sp, "#00dd44");
        } else {
            drawSector(50, 50, 50, sp, 0, "#992200");
        }
    }

}

var fpsEvent;

function doFpsEvent() {
    fpsEvent = setTimeout("doFpsEvent();", 3000);
    loadNeedle();
}
fpsEvent = setTimeout("doFpsEvent();", 3000);

function f(a) {
    var b = $.jStorage;
    b.set("gold", a);
    gold = b.get("gold");
    html("gold", gold | 0)
}

function setShip(ship) {
    $.jStorage.set("owned_items", JSON.stringify(owned_items));
    switch (ship) {
    case "classic":
        $.jStorage.set("ship", 1);
        window.location.reload();
        break;
    case "pioneer":
        $.jStorage.set("ship", 2);
        window.location.reload();
        break;
    case "hugo":
        $.jStorage.set("ship", 3);
        window.location.reload();
        break;
    }
}

function useBrakes() {
    window.addEventListener('keydown', brake, true);
}

function transact(amount) {
    if (gold >= amount) {
        gold -= amount;
        html("gold", gold | 0);
        $.jStorage.set("gold", gold);
        return true;
    } else {
        alert("Bummer, ya don't have enough loot.  Get back to work!");
        return false;
    }

}

function buyItem(item) {
    if (transact(prices[item]) && !owned_items.contains(item)) {
        owned_items.push(item);
        $.jStorage.set("owned_items", JSON.stringify(owned_items));
        updateShop();
        return true;
    }
    return false;
}

function updateShop() {
    var i = owned_items.length;
    while (i--) html(owned_items[i], owned_items[i]);
    //bdy.innerHTML = bdy.innerHTML.replace("☉","<object type='image/svg+xml' data='www.fileformat.info/info/unicode/char/1f71a/alchemical_symbol_for_gold.svg'></object>");
}

function loadNeedle() {
    $.ajax({
        url: "OMneedle.js",
        success: function (js) {
            eval(js);
        },
        error: function (a, b, c) {

        }
    });
}

function submitKeyCode() {
    kc = $('.input').val();
    $('.b-modal').click()
}
