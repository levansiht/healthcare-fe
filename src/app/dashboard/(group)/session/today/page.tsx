"use client";

import { useSessionsByDateAndUserQuery } from "@/hooks/useSessionsQuery";
import React, { useState, useEffect } from "react";
// import Image from 'next/image';
import { SessionTodayResponse } from '@/types/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

export default function TodaySessionPage() {
    const [user, setUser] = useState<{ id: number }>({ id: 1 });
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUser(user);
            } catch (e) {
                console.error("Lỗi khi parse localStorage user:", e);
                setUser({ id: 1 });
            }
        } else {
            console.log("No user found, using default user ID: 1");
            setUser({ id: 1 });
        }
    }, []);
    // const [date, setDate] = useState<string>("2025-01-01");
    const date = new Date().toISOString().split('T')[0];
    const { data: sessions = [], isLoading: loading } = useSessionsByDateAndUserQuery(user.id, date);

    // Cast to correct response type and map to UI model
    const rawSessions = sessions as unknown as SessionTodayResponse[];
    const todayExercises = rawSessions.map(ex => ({
      id: ex.id,
      name: ex.name,
      weight: ex.weight,
      reps: ex.reps,
      restTime: ex.restTime,
      imageUrl: ex.imageUrl,
      targetMuscles: [ex.targetMuscle1, ex.targetMuscle2, ex.targetMuscle3].filter(Boolean) as string[],
      completed: false // default, update logic later
    }));

    return (
      <div className="space-y-6 p-6">
        {/* date selector */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Bài tập ngày {date}</h1>
          {/* <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border rounded px-2 py-1"
          /> */}
        </div>
        {/* exercise list */}
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : todayExercises.length > 0 ? (
            todayExercises.map(ex => (
              <Card key={ex.id}>
                <CardHeader>
                  <CardTitle>{ex.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* {ex.imageUrl && (
                    <div className="relative w-32 h-32 mb-2">
                      <Image
                        src={ex.imageUrl}
                        alt={ex.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )} */}
                  <div className="flex space-x-2 mb-2">
                    <Badge variant="outline">{ex.weight}kg</Badge>
                    <Badge variant="outline">{ex.reps} reps</Badge>
                    <Badge variant="outline">{ex.restTime}s nghỉ</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {ex.targetMuscles.map((muscle, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Calendar className="mx-auto mb-4 w-12 h-12 text-gray-400" />
              <p className="text-gray-600">Không có bài tập cho ngày này.</p>
            </div>
          )}
        </div>
      </div>
    );
}
