import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Billboard, Environment } from "@react-three/drei";
import * as THREE from "three";
import { usePanel } from "../../provider/PanelProvider";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { Github } from "lucide-react";
import { FolderDot } from "lucide-react";

function Crystal() {
  const crystalRef = useRef();

  // Rotate slowly
  useFrame(() => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += 0.003;
      crystalRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh ref={crystalRef}>
      {/* Crystal Geometry */}
      <icosahedronGeometry args={[1.5, 0]} />
      {/* Glassy Material */}
      <meshPhysicalMaterial
        transmission={1} // Glass effect
        roughness={0}
        thickness={0.8}
        clearcoat={1}
        clearcoatRoughness={0}
        reflectivity={1}
        ior={1.5} // index of refraction
        color="#a2d2ff"
      />
    </mesh>
  );
}

function PointerText({ pos, text, onClick }) {
  const groupRef = useRef();
  const linePoints = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...pos)];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.position.x = Math.sin(t) * 0.003;
    groupRef.current.position.y = Math.sin(t) * 0.003;
  });

  return (
    <group ref={groupRef}>
      <line geometry={lineGeometry}>
        <lineBasicMaterial color="white" />
      </line>
      <Billboard position={pos}>
        <Text
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          fontSize={0.25}
          color="#333"
          font="./static/GoogleSansCode-BoldItalic.ttf"
          fontWeight="20px"
        >
          {text}
        </Text>
      </Billboard>
    </group>
  );
}

const Model = () => {
  const { isOpen, setIsOpen } = usePanel();

  function loadPanel(name, data) {
    setIsOpen({
      open: true,
      data: {
        name: name,
        collection: data,
      },
    });
  }

  const About = [
    {
      title: "Short & Casual :",
      discription:
        "✨ Anuj Lakhekar | JD College, Nagpur | Passionate about coding 💻 | Exploring React.js, Python & more 🚀",
    },
    {
      title: "Professional (resume / LinkedIn style):",
      discription:
        "I’m Anuj Lakhekar, a student at JD College, Nagpur, passionate about coding and software development. My interests include React.js, Python, and full-stack development, and I’m constantly exploring new technologies to sharpen my skills.",
    },
    {
      title: "BIO",
      embleds: [
        {
          name: "Instagram",
          link: "https://instagram.com/yourusername",
          icon: Instagram,
          color: "white",
        },
        {
          name: "Facebook",
          link: "https://facebook.com/yourusername",
          icon: Facebook,
          color: "white",
        },
      ],
    },
  ];

  const GithubModel = [
    {
      title: "Profile",
      discription:
        "🌐 Explore my projects, contributions, and open-source journey on GitHub. Always building, learning, and sharing code with the community.",
      embleds: [
        {
          name: "GitHub",
          link: "https://github.com/yourusername",
          icon: Github,
          color: "white",
        },
      ],
    },
    {
      title: "Featured Project",
      discription:
        "🚀 Schologamma Beta — A modern hackathon/event platform built with Next.js & Vercel. Designed for seamless collaboration and event management.",
      embleds: [
        {
          name: "Live Demo",
          link: "https://schologamma-beta.vercel.app/",
          icon: FolderDot,
          color: "pink",
        },
        {
          name: "Source Code",
          link: "https://github.com/yourusername/schologamma-beta",
          icon: FolderDot,
          color: "blue",
        },
      ],
    },
  ];

  const Social = [
    {
      title: "Connect with Me",
      discription:
        "🤝 Stay connected through my social media. Let’s share ideas, collaborate, and grow together.",
      embleds: [
        {
          name: "Instagram",
          link: "https://instagram.com/yourusername",
          icon: Instagram,
          color: "#E1306C", // Instagram pink
        },
        {
          name: "Facebook",
          link: "https://facebook.com/yourusername",
          icon: Facebook,
          color: "#1877F2", // Facebook blue
        },
        {
          name: "LinkedIn",
          link: "https://linkedin.com/in/yourusername",
          icon: Linkedin,
          color: "#0A66C2", // LinkedIn blue
        },
        {
          name: "Twitter",
          link: "https://twitter.com/yourusername",
          icon: Twitter,
          color: "#1DA1F2", // Twitter blue
        },
      ],
    },
  ];

  return (
    <Canvas
      style={{ height: "100vh" }}
      camera={{ position: [4, 3, 4], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />

      <Crystal />

      <PointerText
        onClick={() => {
          loadPanel("About", About);
        }}
        pos={[0, 2, 0]}
        text="About"
      />
      <PointerText
        onClick={() => {
          loadPanel("Github", GithubModel);
        }}
        pos={[-2, 0, 0]}
        text="Github"
      />
      <PointerText
        onClick={() => {
          loadPanel("Social", Social);
        }}
        pos={[0, 0, 2]}
        text="Social"
      />

      <OrbitControls
        rbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={1.2}
        autoRotate={isOpen.open ? false : true}
        autoRotateSpeed={1}
      />
      <Environment files="./grad.hdr" background={true} />
    </Canvas>
  );
};

export default Model;
