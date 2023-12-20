import { TaskModal } from "./components/TaskModal";
import TaskTable from "./components/TaskTable";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <main className="w-full h-full container">
        <div className="w-full grid grid-cols-4 gap-8 p-8">
          <div className="col-span-2 col-start-4    flex justify-end col-end-4 row-span-1">
            <TaskModal>
              <Button variant="outline">Insert Task</Button>
            </TaskModal>
          </div>
          <TaskTable />
        </div>
      </main>
    </>
  );
}

export default App;
