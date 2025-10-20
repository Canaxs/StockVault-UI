import { useState } from "react";
import { Button } from "../../../../components/Form/Button";
import { PaginateTable } from "../../../../components/PaginateTable/PaginateTable";
import { LayoutDashboard } from "../../../../layouts/LayoutDashboard/LayoutDashboard";
import { UserHeader } from "../../components/UserHeader/UserHeader";
import { useGetListUserQuery } from "../../api/userApi";
import type { OperationClaimDto } from "../../types/OperationClaimDto";

const userColumns = [
  { key: "id", label: "Id" },
  { key: "username", label: "Kullanıcı Adı" },
  {
    key: "operationClaimDtos",
    label: "Roller",
    render: (item: any) => (
      <ul>
        {item.operationClaimDtos.map((claim: OperationClaimDto) => (
          <li key={claim.id}>{claim.name}</li>
        ))}
      </ul>
    ),
  },
];

export function UserDashboard() {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const userQuery = useGetListUserQuery({
    PageIndex: page,
    PageSize: pageSize,
  });

  const response = userQuery.data;

  const content = (
    <div className="flex flex-col p-7">
      <UserHeader />
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-5">
          <PaginateTable
            title="Ürünler"
            columns={userColumns}
            data={response?.items || []}
            totalCount={response?.count || 0}
            hasNext={response?.hasNext || false}
            hasPrevious={response?.hasPrevious || false}
            onNext={() => {
              if (response?.hasNext) setPage((prev) => prev + 1);
            }}
            onPrevious={() => {
              if (response?.hasPrevious) setPage((prev) => prev - 1);
            }}
            renderModalContent={(item) => (
              <div className="flex flex-col gap-3 p-5 min-w-[300px]">
                <h2 className="font-medium text-lg">Ürün Detayı</h2>
                <p>
                  <strong>Numarası:</strong> {item.id}
                </p>
                <p>
                  <strong>Kullanıcı Adı:</strong> {item.username}
                </p>
                <div>
                  <strong>Rolleri:</strong>
                  <ul className="list-disc pl-5">
                    {item.operationClaimDtos.map((claim: OperationClaimDto) => (
                      <li key={claim.id}>{claim.name}</li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => console.log(item.id)}
                >
                  Düzenle
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
  return <LayoutDashboard children={content} />;
}
