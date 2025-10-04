import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

export default function CompareAnswersModal({ assessmentAnswerId, onClose }: { assessmentAnswerId: string, onClose: () => void }) {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Ambil jawaban user
      const ansRes = await fetch(`/api/Assesment/Answer?id=${assessmentAnswerId}`);
      const ansData = await ansRes.json();
      setAnswers(ansData.answers || []);

      // Ambil soal dan kunci jawaban
      const qRes = await fetch(`/api/Assesment/Question?assessmentId=${ansData.assessmentId}`);
      const qData = await qRes.json();
      setQuestions(qData.questions || []);
      setLoading(false);
    }
    fetchData();
  }, [assessmentAnswerId]);

  if (loading) return <div className="p-8 text-center">Memuat data...</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8 relative">
        <Button className="absolute top-4 right-4" onClick={onClose}>Tutup</Button>
        <h2 className="text-xl font-bold mb-4">Perbandingan Jawaban Anda</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {answers.map((ans: any, idx: number) => {
            const q = questions[ans.questionIndex];
            const isCorrect = ans.isCorrect;
            return (
              <div key={idx} className="p-4 rounded-lg border bg-muted/20">
                <div className="font-semibold">{q?.questionText || "Soal tidak ditemukan"}</div>
                <div className="mt-2">
                  <span className="font-medium">Jawaban Anda: </span>
                  <span>{ans.answer}</span>
                  {isCorrect ? (
                    <CheckCircle className="inline-block w-4 h-4 text-green-500 ml-2" />
                  ) : (
                    <XCircle className="inline-block w-4 h-4 text-red-500 ml-2" />
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span>Kunci Jawaban: </span>
                  <span>{q?.correctAnswer}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}