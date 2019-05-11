import * as THREE from "three-full";
import { Injectable } from "@angular/core";


// Thomas developer notes!
// Access mesh coordinates
// https://stackoverflow.com/questions/46140209/loop-rotation-on-any-axis-for-a-3d-obj-three-js
// see: https://www.npmjs.com/package/three-gltf-loader#usage

@Injectable({
  providedIn: "root"
})
export class EngineService {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private Ambientlight: THREE.AmbientLight;
  private cube: THREE.Mesh;


  createScene(elementId: string): void {
    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true, // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth / 2, window.innerHeight / 1.2);


    // create the scene
    this.scene = new THREE.Scene();
    //set the background color of the scene with hex value
    this.renderer.setClearColor(0xFFEFF0, 1);
    //set up camera and its position
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);
    //The loader is used to import the 3D model.
    var loader = new THREE.GLTFLoader();

    loader.load(
      "/assets/Battery.gltf",
      gltf => {
        console.log("gltfobject:", gltf);
        //rotation and position of the model can be accesed here.
        gltf.scene.scale.set(1.2,1,1);
        gltf.scene.rotation.set(0, 0, 0);
        gltf.scene.position.set(-0.33, -1.2, -2);
        //Add 3D model to the scene.
        this.scene.add(gltf.scene);
      },
      xhr => {
        // called while loading is progressing, shows loading in console.
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      error => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );

    // soft white ambient light.
    this.Ambientlight = new THREE.AmbientLight(0x404040, 3);
    this.Ambientlight.position.z = 100;
    this.scene.add(this.Ambientlight);


    // cube mesh used for debugging.
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cube);
  }

  animate(): void {
    window.addEventListener("DOMContentLoaded", () => {
      this.render();
    });

    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });
    // this.scene.gltf.rotation.x += 0.01;
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    // This makes the render canvas rezise itself if the webpage is resized.
    let width = window.innerWidth / 2;
    let height = window.innerHeight / 1.2;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
