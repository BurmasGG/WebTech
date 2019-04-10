import * as THREE from 'three-full';
import { Injectable } from '@angular/core';
import {STLLoader} from 'three';
//import objLoader from 'three-obj-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { load } from '@angular/core/src/render3';

//Thomas developer notes!
//comment shit out until error goes away i guess
//find ou how to install the load we're importing
//Open avocado in blender <3

@Injectable({
  providedIn: 'root'
})

export class EngineService {
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private Ambientlight: THREE.AmbientLight;
  private spotlight: THREE.spotlight;
  private cube: THREE.Mesh; 
  private gltfLoader: THREE.GLTFLoader;


  createScene(elementId: string): void {

    // The first step is to get the reference of the canvas element from our HTML document
    this.canvas = <HTMLCanvasElement>document.getElementById(elementId);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      //alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize((window.innerWidth / 2), (window.innerHeight / 2));
    // this.canvas.height = window.innerHeight/2;
    // this.canvas.width = window.innerWidth/2;
    // this.canvas.style = "margin-left: 50%";
    // this.canvas.setAttribute('margin-left', '50%')

    // create the scene
    this.scene = new THREE.Scene();



    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

/*  
   see: https://www.npmjs.com/package/three-gltf-loader#usage
 */

    var loader = new THREE.GLTFLoader();
    console.log(loader); 
    
    loader.load(
      '/assets/Battery.gltf',
      (gltf) => {
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            var hello = 'hello!';//For debugging
            console.log(hello);
          }
        })
      this.scene.add(gltf.scene);

        },
      ( xhr ) => {
        // called while loading is progressing
        console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );

    },
    ( error ) => {
      // called when loading has errors
      console.error( 'An error happened', error );
    });

    
   // soft white ambient light
    this.Ambientlight = new THREE.AmbientLight(0x404040,2);
    this.Ambientlight.position.z = 10;
    this.scene.add(this.Ambientlight);
   /*//Spotlight
    this.spotlight = new THREE.spotlight(0xffffff);
    this.spotlight.position.set(100,100,100);
    this.scene.add(this.spotlight);*/

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    //this.scene.add(this.cube);
  }


  animate(): void {
    window.addEventListener('DOMContentLoaded', () => {
      this.render();
    });

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  render() {
    requestAnimationFrame(() => {
      this.render();
    });
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    let width = window.innerWidth / 2;
    let height = window.innerHeight / 2;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}


