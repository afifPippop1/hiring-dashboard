"use client";

import { motion } from "framer-motion";

const initial = { opacity: 0, y: 20 } as const;
const animate = { opacity: 1, y: 0 } as const;
const transition = { duration: 0.3 } as const;

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={initial} animate={animate} transition={transition}>
      {children}
    </motion.div>
  );
}
