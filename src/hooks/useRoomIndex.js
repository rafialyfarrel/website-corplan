import { useMemo } from "react";

/**
 * Build room index for fast lookup
 * @param {Object} data - Room data
 * @returns {Map} Map of name to room info
 */
const buildRoomIndex = (data) => {
  const idx = new Map();

  const norm = (s) => String(s || "").trim().toLowerCase();

  const push = (groupName, row) => {
    const payload = {
      no_kamar: row?.no_kamar ?? "-",
      lantai: row?.lantai ?? "-",
      group: groupName,
    };

    if (row?.nama_1) idx.set(norm(row.nama_1), payload);
    if (row?.nama_2) idx.set(norm(row.nama_2), payload);
  };

  ["Partner", "Peserta", "Panitia"].forEach((g) => {
    (data?.[g] || []).forEach((row) => push(g, row));
  });

  return idx;
};

/**
 * Get room info by participant name
 * @param {Map} roomIndex - Room index map
 * @param {string} name - Participant name
 * @returns {Object|null} Room info or null
 */
export const getRoomInfoByName = (roomIndex, name) => {
  if (!name) return null;
  const key = String(name).trim().toLowerCase();
  return roomIndex.get(key) || null;
};

/**
 * Custom hook for room index lookup
 * @param {Object} roomData - Room data from JSON
 * @returns {Object} Room index and lookup function
 */
export const useRoomIndex = (roomData) => {
  const roomIndex = useMemo(() => buildRoomIndex(roomData), [roomData]);

  return {
    roomIndex,
    getRoomInfoByName: (name) => getRoomInfoByName(roomIndex, name),
  };
};
