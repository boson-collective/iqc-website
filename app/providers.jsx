"use client";
import { useEffect } from "react"; 
import useLenis from "../hooks/useLenis"; 

export default function Providers({ children }) {
useLenis();  
  
  return children;
}



