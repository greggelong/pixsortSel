let img;
let cvn;
let inst;
let msg;
let gotit =false;
let img2
let osc; // off screen canvas
let wrn 
let sort = false
let lasttouch =0;
let mfile;

 

function setup() {
  print("behi", img)
  cvn = createCanvas(800, 800);
  cvn.parent('sketch-holder')
  let cx = windowWidth/2-cvn.width/2
  let cy = windowHeight/2-cvn.height/2
  //cvn.position(cx,cy)
  myfile = createFileInput(handleFile);
  myfile.parent('fsel');
  wrn = select("#out")
  wrn.html("Drag and Drop an Image")
  background(255)
  //inst = createP("Click and hold the mouse button to sort!")
  wrn.style("color","red")
  pixelDensity(1);
   
  cvn.drop(handleFile,handleDrop)
  //img2 = createImage(400,400)

  // Resize the image 
  // at this level each pixel is two by two to screen
  //img.resize(400,400);
  


  noSmooth(); // keeps it crisp
  //image(img, 0, 0, width, height);
  print("hi")
}
async function handleFile(file) {
  print("bing")
  // Remove the current image, if any.
  if (img) {
    img.remove();
    print("this is it",img)
    
    //osc.clear()
  }
   // is the problem a-sync******
  // Create an  element with the
  // dropped file.
  if (file.type === 'image'){
    print("it is an image")
    print("width",file)
  img = await createImg(file.data, '');
  img.size(img.width,img.height)
  
  }
  print(img.width)
  print("gotit")
  imagetoOffScreen(img)
  
}

function imagetoOffScreen(img){
  //img.hide();
  if(img.height >0){
  osc = createGraphics(img.width,img.height)

   osc.drawingContext.drawImage(img.elt,0,0)
   img.hide();

  img2 = osc.get(0,0,osc.width,osc.height)
  img2.resize(400,0)

  // Draw the image.
  //img.hide()
  image(img2, 0, 0,height,width);
  //image(img2,width/2,height/2)
  gotit=true;
  print(gotit)
  sort = false // so it doest start sorting right away
  wrn.html("Clicking the Mouse toggles sorting")
  }else{
    img.hide()
    gotit=false
    print("try again")
    wrn.html("SORRY: Try to place the image AGAIN")
    sort = false;
  }
}

function handleDrop(event) {
  gotit =false
  // Remove current paragraph, if any.
  //if (msg) {
  //  msg.remove();
  //}

  // Use event to get the drop
  // target's id.
  let id = event.target.id;

  // Write the canvas' id
  // beneath it.
  // msg = createP(id);
  // msg.position(0, 100);

  // // Set the font color
  // // randomly for each drop.
  // let c = random(['red', 'green', 'blue']);
  // msg.style('color', c);
  // msg.style('font-size', '12px');
}

function draw() {
  print("hello")
  //background(255)
  if(gotit && sort){
  img2.loadPixels();

  // Loop 100 many times
  for (let i = 0; i < 56000; i++) {
    //sortPixelsPaTB();
    //you can sort different ways 
    //sortPixelsPaLR();  // left right
    sortPixelsPaTB();  //  check right neighbor and switch with with one below
  }

  img2.updatePixels();
}
if(gotit){
  image(img2, 0, 0, width, height);
}
}

function touchStarted() {
  const currenttime = millis();
  const timesincelasttouch = currenttime - lasttouch;

  if (timesincelasttouch > 500) {
    /// toggle mix
    if (!sort) {
       
      sort = true;
    } else {
      sort = false;
    }
  }

  lasttouch = currenttime;
}

function mouseClicked() {
  touchStarted();
}



function sortPixelsPaLR() {
  
  
  // Get a random pixel.
  const x = floor(random(img2.width-1)); // so not out of range
  const y = floor(random(img2.height));

  // Get the position of target and neighbor in the pixel array
  let pos =4*( y*img2.width+x);
  let nei = 4*(y*img2.width+(x+1));
  //let pos2 = 4*((y+1)*img.width+(x))
  

  

  // Get the total R+G+B of both colors.
  let totalOne = img2.pixels[pos]+ img2.pixels[pos+1] + img2.pixels[pos+2];
  let totalTwo = img2.pixels[nei]+ img2.pixels[nei+1] + img2.pixels[nei+2];
  let temp = [];  // a temp for switing

  temp[0] = img2.pixels[pos];
  temp[1] = img2.pixels[pos+1]
  temp[2] = img2.pixels[pos+2]


  // If the first total is less than the second total, swap the pixels.
  // 
  // dark to the the right
  if (totalOne < totalTwo) {
  
    img2.pixels[pos] = img2.pixels[nei]
    img2.pixels[pos+1] = img2.pixels[nei+1]
    img2.pixels[pos+2] = img2.pixels[nei+2]
    //img.set(x, y + 1, colorOne);
    img2.pixels[nei] = temp[0]
    img2.pixels[nei+1] = temp[1]
    img2.pixels[nei+2] = temp[2]
  }
  
}

function sortPixelsPaTB() {
  
  
  // Get a random pixel.
  const x = floor(random(img.width)); // so not out of range
  const y = floor(random(img2.height-1));

  // Get the position in the pixel array
  let pos =4*( y*img2.width+x);
  let nei = 4*((y+1)*img2.width+(x));
  //let pos2 = 4*((y+1)*img2.width+(x))
  

  // Get the position of target and neighbor in the pixel array

  // Get the total R+G+B of both colors.
  let totalOne = img2.pixels[pos]+ img2.pixels[pos+1] + img2.pixels[pos+2];
  let totalTwo = img2.pixels[nei]+ img2.pixels[nei+1] + img2.pixels[nei+2];
  let temp = [];

  temp[0] = img2.pixels[pos];
  temp[1] = img2.pixels[pos+1]
  temp[2] = img2.pixels[pos+2]


  // If the first total is less than the second total, swap the pixels.
  // This causes darker colors to fall to the bottom,
  // and light pixels to rise to the top.
  if (totalOne < totalTwo) {
  
    img2.pixels[pos] = img2.pixels[nei]
    img2.pixels[pos+1] = img2.pixels[nei+1]
    img2.pixels[pos+2] = img2.pixels[nei+2]
    //img2.set(x, y + 1, colorOne);
    img2.pixels[nei] = temp[0]
    img2.pixels[nei+1] = temp[1]
    img2.pixels[nei+2] = temp[2]
  }
  
}



function sortPixelsPaLRB() {
  
  
  // Get a random pixel.
  const x = floor(random(img2.width-1)); // so not out of range
  const y = floor(random(img2.height));

  // Get the position in the pixel array
  let pos =4*( y*img2.width+x);
  let nei = 4*(y*img2.width+(x+1));
  let pos2 = 4*((y+1)*img2.width+(x))
  

  

  // Get the total R+G+B of both colors.
  let totalOne = img2.pixels[pos]+ img2.pixels[pos+1] + img2.pixels[pos+2];
  let totalTwo = img2.pixels[nei]+ img2.pixels[nei+1] + img2.pixels[nei+2];
  let temp = [];

  temp[0] = img2.pixels[pos];
  temp[1] = img2.pixels[pos+1]
  temp[2] = img2.pixels[pos+2]


  // If the first total is less than the second total, the first one with pos2.
  // This causes a wind like effect that that seems to blow to the left
  // and down
  if (totalOne < totalTwo) {
  
    img2.pixels[pos] = img2.pixels[nei]
    img2.pixels[pos+1] = img2.pixels[nei+1]
    img2.pixels[pos+2] = img2.pixels[nei+2]
    //img2.set(x, y + 1, colorOne);
    img2.pixels[pos2] = temp[0]
    img2.pixels[pos2+1] = temp[1]
    img2.pixels[pos2+2] = temp[2]
  }
  
}
 