import { AdminGameEditorPage } from "@/src/components/AdminGameEditorPage";

export default async function Page({ params }: { params: Promise<{ gameId: string }> }) {
  const { gameId } = await params;
  return <AdminGameEditorPage gameId={gameId} />;
}