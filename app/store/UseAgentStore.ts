import axios from "axios";
import { create } from "zustand";

type AgentStore = {
  agentResult: string | null;
  agentLoading: boolean;
  getAgentRecipe: (id: string, substitute?: string) => Promise<void>;
  resetAgent: () => void;
};

export const UseAgentStore = create<AgentStore>((set) => ({
  agentResult: null,
  agentLoading: false,

  getAgentRecipe: async (id, substitute = "") => {
    set({ agentLoading: true, agentResult: null });
    try {
      const res = await axios.post(`/api/agent/${id}`, { substitute });
      console.log(res);
      set({ agentResult: res.data.result, agentLoading: false });
    } catch (err) {
      console.error("Agent request failed:", err);
      set({ agentLoading: false });
    }
  },

  resetAgent: () => set({ agentResult: null, agentLoading: false }),
}));
